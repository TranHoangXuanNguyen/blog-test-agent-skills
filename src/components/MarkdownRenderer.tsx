/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import React, { useState } from 'react';
import { preprocessObsidian } from '../lib/obsidianPreprocess';
import assetsMap from '../lib/assetsMap';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800/80 bg-slate-900 shadow-md my-6 text-left">
      {/* Top window control bar (Mac style) */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-850/30">
        <div className="flex items-center gap-6">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-bold font-sans"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-450" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      {/* If the fenced block looks like prose (short paragraph), render as wrapped text instead of code */}
      {(() => {
        const txt = String(code || '').trim();
        const lines = txt.split('\n');
        const codeTokens = ['{', '}', ';', '=>', 'function', 'const ', 'let ', 'var ', '<', '</', 'import ', 'export ', 'class ', 'console.', 'return '];
        let isLikelyProse = false;
        if (txt.length > 0) {
          const hasCodeToken = codeTokens.some(t => txt.includes(t));
          if (!hasCodeToken && lines.length <= 3) {
            // if contains sentence punctuation or is reasonably long prose, treat as text
            if (/[\.\!?]/.test(txt) && /\s/.test(txt)) isLikelyProse = true;
            if (!isLikelyProse && txt.length > 80 && /\s/.test(txt)) isLikelyProse = true;
          }
        }

        if (isLikelyProse) {
          return (
            <div className="p-4 text-sm text-slate-200 bg-slate-900 leading-relaxed select-text whitespace-pre-wrap break-words">
              {txt}
            </div>
          );
        }

        return (
          <pre className="p-4 overflow-x-auto font-mono text-sm text-slate-200 bg-slate-900 leading-relaxed select-text">
            <code>{code}</code>
          </pre>
        );
      })()}
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Preprocess Obsidian-style markdown (wikilinks, inline styles) and extract footnotes
  const pre = preprocessObsidian(content || '');

  // Extract footnote definitions of the form "[^id]: text" (support simple multi-line indented continuations)
  const footnotes: { id: string; text: string }[] = [];
  const contentLines = pre.split('\n');
  const mainLines: string[] = [];
  let idx = 0;
  while (idx < contentLines.length) {
    const line = contentLines[idx];
    const m = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (m) {
      const id = m[1];
      let text = m[2] || '';
      idx++;
      // capture indented continuation lines
      while (idx < contentLines.length && /^\s{2,}\S/.test(contentLines[idx])) {
        text += '\n' + contentLines[idx].replace(/^\s{2,}/, '');
        idx++;
      }
      footnotes.push({ id, text: text.trim() });
      continue;
    }
    mainLines.push(line);
    idx++;
  }

  const lines = mainLines.join('\n').split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentKey = 0;
  const nextKey = () => `md-${currentKey++}`;

  // Hàm chuyển đổi tiêu đề thành ID slug liên kết
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Helper for inline rendering (bold, link, inline-code, image)
  const renderInline = (text: string): React.ReactNode => {
    // 1. Detect image: ![alt](url)
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    const imgMatch = [...text.matchAll(imgRegex)];
    if (imgMatch.length > 0) {
      const [, alt, url] = imgMatch[0];
      // Resolve local asset filenames (e.g. /assets/img.png or img.png) to Vite-built URLs
      let resolvedUrl = url;
      const basename = url.split('/').pop() || url;
      if (assetsMap[basename]) resolvedUrl = assetsMap[basename];

      return (
        <span key={nextKey()} className="block my-6">
          <img
            src={resolvedUrl}
            alt={alt}
            className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-md border border-gray-100 dark:border-gray-800"
            loading="lazy"
          />
          {alt && (
            <span className="block text-center text-xs text-gray-500 mt-2.5 italic dark:text-gray-400">
              {alt}
            </span>
          )}
        </span>
      );
    }

    // 2. Tokenize and parse inline elements: bold, link, code
    const tokens: React.ReactNode[] = [];
    let lastIndex = 0;
    
    const inlineRegex = /(\*\*.*?\*\*|==.*?==|\*[^*].*?\*|\[\^[^\]]+\]|\[.*?\]\(.*?\)|`.*?`)/g;
    const matches = [...text.matchAll(inlineRegex)];

    if (matches.length === 0) {
      return text;
    }

    matches.forEach((match, idx) => {
      const matchText = match[0];
      const matchIndex = match.index ?? 0;

      if (matchIndex > lastIndex) {
        tokens.push(text.slice(lastIndex, matchIndex));
      }

      if (matchText.startsWith('**') && matchText.endsWith('**')) {
        const boldContent = matchText.slice(2, -2);
        tokens.push(
          <strong key={`bold-${idx}`} className="font-bold text-gray-950 dark:text-white">
            {boldContent}
          </strong>
        );
      } else if (/^\[\^[^\]]+\]$/.test(matchText)) {
        // footnote reference like [^1]
        const fid = matchText.slice(2, -1);
        tokens.push(
          <sup key={`fnref-${idx}`} className="align-super text-xs">
            <a id={`ref-${fid}`} href={`#fn-${fid}`} className="font-semibold text-indigo-600 dark:text-indigo-400">[{fid}]</a>
          </sup>
        );
      } else if (matchText.startsWith('[') && matchText.includes('](')) {
        const closeBracketIdx = matchText.indexOf(']');
        const linkText = matchText.slice(1, closeBracketIdx);
        const linkUrl = matchText.slice(closeBracketIdx + 2, -1);
        tokens.push(
          <a
            key={`link-${idx}`}
            href={linkUrl}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        const codeContent = matchText.slice(1, -1);
        tokens.push(
          <code
            key={`code-${idx}`}
            className="px-1.5 py-0.5 rounded font-mono text-sm bg-gray-150 text-indigo-650 dark:bg-slate-800 dark:text-indigo-300 font-medium"
          >
            {codeContent}
          </code>
        );
      }
      else if (matchText.startsWith('==') && matchText.endsWith('==')) {
        const inner = matchText.slice(2, -2);
        tokens.push(
          <mark key={`mark-${idx}`} className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">{inner}</mark>
        );
      }
      else if (matchText.startsWith('*') && matchText.endsWith('*')) {
        const inner = matchText.slice(1, -1);
        tokens.push(
          <em key={`em-${idx}`} className="italic">{inner}</em>
        );
      }

      lastIndex = matchIndex + matchText.length;
    });

    if (lastIndex < text.length) {
      tokens.push(text.slice(lastIndex));
    }

    return <>{tokens}</>;
  };

  // Stateful line-by-line block parser
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      i++;
      continue;
    }

    // 2. Code Block
    if (trimmedLine.startsWith('```')) {
      const lang = trimmedLine.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const codeText = codeLines.join('\n');
      elements.push(
        <section key={nextKey()} className="my-6 text-left">
          <CodeBlock code={codeText} language={lang} />
        </section>
      );
      continue;
    }

    // 3. Table
    if (trimmedLine.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      const rows = tableLines
        .map(rowLine => rowLine.split('|').map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1))
        .filter(row => !row.every(cell => cell.startsWith('-')));

      if (rows.length > 0) {
        const headers = rows[0];
        const bodyRows = rows.slice(1);
        elements.push(
          <section key={nextKey()} className="overflow-x-auto my-8 border border-gray-150 dark:border-slate-800/80 rounded-2xl shadow-sm bg-white dark:bg-slate-900">
            <table className="min-w-full divide-y divide-gray-150 dark:divide-slate-800 text-sm">
              <thead className="bg-gray-50/70 dark:bg-slate-900/80">
                <tr>
                  {headers.map((h, idx) => (
                    <th
                      key={`th-${idx}`}
                      className="px-6 py-3.5 text-left font-bold text-gray-900 dark:text-white uppercase tracking-wider"
                    >
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-gray-100 dark:divide-slate-850">
                {bodyRows.map((r, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="hover:bg-gray-50/40 dark:hover:bg-slate-850/20 transition-colors">
                    {r.map((c, colIdx) => (
                      <td key={`td-${rowIdx}-${colIdx}`} className="px-6 py-4 text-gray-700 dark:text-gray-305 whitespace-pre-line leading-relaxed">
                        {renderInline(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      }
      continue;
    }

    // 4. Headings (supports # through ######, with ID slugs for TOC)
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const id = slugify(headingText);

      if (level === 1) {
        elements.push(
          <h1 key={nextKey()} id={id} className="text-4xl font-extrabold text-gray-900 dark:text-white mt-12 mb-6 tracking-tight scroll-mt-20">
            {renderInline(headingText)}
          </h1>
        );
      } else if (level === 2) {
        elements.push(
          <h2 key={nextKey()} id={id} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 tracking-tight border-b border-gray-100 dark:border-slate-850 pb-2 scroll-mt-20">
            {renderInline(headingText)}
          </h2>
        );
      } else if (level === 3) {
        elements.push(
          <h3 key={nextKey()} id={id} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 tracking-tight scroll-mt-20">
            {renderInline(headingText)}
          </h3>
        );
      } else if (level === 4) {
        elements.push(
          <h4 key={nextKey()} className="text-lg font-bold text-gray-800 dark:text-gray-205 mt-6 mb-2">
            {renderInline(headingText)}
          </h4>
        );
      } else if (level === 5) {
        elements.push(
          <h5 key={nextKey()} className="text-base font-semibold text-gray-800 dark:text-gray-205 mt-5 mb-2">
            {renderInline(headingText)}
          </h5>
        );
      } else {
        elements.push(
          <h6 key={nextKey()} className="text-sm font-medium text-gray-700 dark:text-gray-400 mt-4 mb-1">
            {renderInline(headingText)}
          </h6>
        );
      }

      i++;
      continue;
    }

    // 5. Blockquote
    if (trimmedLine.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        let quoteLine = lines[i].trim().slice(1);
        if (quoteLine.startsWith(' ')) {
          quoteLine = quoteLine.slice(1);
        }
        quoteLines.push(quoteLine);
        i++;
      }

      // Parse inner lines to allow lists and paragraphs inside blockquote
      const innerElements: React.ReactNode[] = [];
      let qidx = 0;

      // If first line is a callout label like "**Note:** ...", render it as bold prefix
      if (quoteLines.length > 0) {
        const m = quoteLines[0].match(/^\s*\*\*(.+?):\*\*\s*(.*)$/);
        if (m) {
          const label = m[1];
          const rest = m[2];
          innerElements.push(
            <p key={`${nextKey()}-label`} className="font-bold mb-2">
              <strong>{label}:</strong> {rest ? renderInline(rest) : null}
            </p>
          );
          qidx = 1;
        }
      }

      while (qidx < quoteLines.length) {
        const qline = quoteLines[qidx];
        // unordered list
        if (qline.startsWith('- ') || qline.startsWith('* ')) {
          const items: string[] = [];
          while (qidx < quoteLines.length && (quoteLines[qidx].startsWith('- ') || quoteLines[qidx].startsWith('* '))) {
            items.push(quoteLines[qidx].slice(2));
            qidx++;
          }
          innerElements.push(
            <ul key={`${nextKey()}-ul`} className="list-disc pl-5 space-y-1">
              {items.map((it, idx) => (
                <li key={`q-li-${idx}`}>{renderInline(it)}</li>
              ))}
            </ul>
          );
          continue;
        }

        // ordered list
        if (/^\d+\.\s/.test(qline)) {
          const items: string[] = [];
          while (qidx < quoteLines.length && /^\d+\.\s/.test(quoteLines[qidx])) {
            const dotIndex = quoteLines[qidx].indexOf('.');
            items.push(quoteLines[qidx].slice(dotIndex + 1).trim());
            qidx++;
          }
          innerElements.push(
            <ol key={`${nextKey()}-ol`} className="list-decimal pl-5 space-y-1">
              {items.map((it, idx) => (
                <li key={`q-oli-${idx}`}>{renderInline(it)}</li>
              ))}
            </ol>
          );
          continue;
        }

        // plain paragraph line
        innerElements.push(
          <p key={`${nextKey()}-p`} className="mb-2 leading-relaxed">
            {renderInline(qline)}
          </p>
        );
        qidx++;
      }

      elements.push(
        <section key={nextKey()} className="my-6">
          <blockquote className="border-l-4 border-indigo-650 bg-indigo-50/20 dark:bg-indigo-950/10 px-6 py-4.5 rounded-r-2xl italic text-gray-800 dark:text-gray-300 leading-relaxed">
            {innerElements}
          </blockquote>
        </section>
      );
      continue;
    }

    // 6. Unordered List
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <section key={nextKey()} className="my-4 pl-2">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {listItems.map((item, idx) => (
              <li key={`li-u-${idx}`}>{renderInline(item)}</li>
            ))}
          </ul>
        </section>
      );
      continue;
    }

    // 7. Ordered List
    if (/^\d+\.\s/.test(trimmedLine)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemLine = lines[i].trim();
        const dotIndex = itemLine.indexOf('.');
        listItems.push(itemLine.slice(dotIndex + 1).trim());
        i++;
      }
      elements.push(
        <section key={nextKey()} className="my-4 pl-2">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {listItems.map((item, idx) => (
              <li key={`li-o-${idx}`}>{renderInline(item)}</li>
            ))}
          </ol>
        </section>
      );
      continue;
    }

    // 8. Horizontal Rule
    if (trimmedLine === '---' || trimmedLine === '***') {
      elements.push(<hr key={nextKey()} className="my-10 border-t border-gray-150 dark:border-slate-850" />);
      i++;
      continue;
    }

    // 9. Standard Paragraph
    elements.push(
      <p key={nextKey()} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
        {renderInline(trimmedLine)}
      </p>
    );
    i++;
  }
  // Append footnotes section if any
  if (footnotes.length > 0) {
    elements.push(<hr key={nextKey()} className="my-8 border-t border-gray-150 dark:border-slate-850" />);
    elements.push(
      <section key={nextKey()} className="text-sm text-gray-700 dark:text-gray-300"> 
        <h4 className="font-semibold mb-3">Footnotes</h4>
        <ol className="list-decimal pl-6 space-y-2">
          {footnotes.map((fn) => (
            <li key={`fn-${fn.id}`} id={`fn-${fn.id}`} className="leading-relaxed">
              {renderInline(fn.text)}{' '}
              <a href={`#ref-${fn.id}`} className="ml-2 text-indigo-600 dark:text-indigo-400">↩</a>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return <div className="markdown-body select-text">{elements}</div>;
}
