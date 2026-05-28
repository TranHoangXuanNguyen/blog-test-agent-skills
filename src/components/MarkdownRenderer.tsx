/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import React, { useState } from 'react';
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
      <pre className="p-4 overflow-x-auto font-mono text-sm text-slate-200 bg-slate-900 leading-relaxed select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');
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
      return (
        <span key={nextKey()} className="block my-6">
          <img
            src={url}
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
    
    const inlineRegex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g;
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

    // 4. Headings (Added ID slugs for Table of Contents scrolling)
    if (trimmedLine.startsWith('## ')) {
      const headingText = trimmedLine.slice(3);
      const id = slugify(headingText);
      elements.push(
        <h2 
          key={nextKey()} 
          id={id}
          className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 tracking-tight border-b border-gray-100 dark:border-slate-850 pb-2 scroll-mt-20"
        >
          {renderInline(headingText)}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmedLine.startsWith('### ')) {
      const headingText = trimmedLine.slice(4);
      const id = slugify(headingText);
      elements.push(
        <h3 
          key={nextKey()} 
          id={id}
          className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 tracking-tight scroll-mt-20"
        >
          {renderInline(headingText)}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmedLine.startsWith('#### ')) {
      elements.push(
        <h4 key={nextKey()} className="text-lg font-bold text-gray-800 dark:text-gray-205 mt-6 mb-2">
          {renderInline(trimmedLine.slice(5))}
        </h4>
      );
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
      const quoteText = quoteLines.join('\n');
      elements.push(
        <section key={nextKey()} className="my-6">
          <blockquote className="border-l-4 border-indigo-650 bg-indigo-50/20 dark:bg-indigo-950/10 px-6 py-4.5 rounded-r-2xl italic text-gray-800 dark:text-gray-300 leading-relaxed">
            {renderInline(quoteText)}
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

  return <div className="markdown-body select-text">{elements}</div>;
}
