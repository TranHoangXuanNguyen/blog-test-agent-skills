/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentKey = 0;
  const nextKey = () => `md-${currentKey++}`;

  // Helper for inline rendering (bold, link, inline-code, image)
  const renderInline = (text: string): React.ReactNode => {
    // 1. Detect image: ![alt](url)
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    const imgMatch = [...text.matchAll(imgRegex)];
    if (imgMatch.length > 0) {
      // For simplicity, if there is an image in the line, render it as a block image
      const [, alt, url] = imgMatch[0];
      return (
        <span key={nextKey()} className="block my-6">
          <img
            src={url}
            alt={alt}
            className="w-full h-auto max-h-[450px] object-cover rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
            loading="lazy"
          />
          {alt && (
            <span className="block text-center text-xs text-gray-500 mt-2 italic dark:text-gray-400">
              {alt}
            </span>
          )}
        </span>
      );
    }

    // 2. Tokenize and parse inline elements: bold, link, code
    const tokens: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Combined regex for link: [text](url), bold: **text**, code: `code`
    const inlineRegex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g;
    const matches = [...text.matchAll(inlineRegex)];

    if (matches.length === 0) {
      return text;
    }

    matches.forEach((match, idx) => {
      const matchText = match[0];
      const matchIndex = match.index ?? 0;

      // Add text before match
      if (matchIndex > lastIndex) {
        tokens.push(text.slice(lastIndex, matchIndex));
      }

      if (matchText.startsWith('**') && matchText.endsWith('**')) {
        // Bold text
        const boldContent = matchText.slice(2, -2);
        tokens.push(
          <strong key={`bold-${idx}`} className="font-bold text-gray-950 dark:text-white">
            {boldContent}
          </strong>
        );
      } else if (matchText.startsWith('[') && matchText.includes('](')) {
        // Link
        const closeBracketIdx = matchText.indexOf(']');
        const linkText = matchText.slice(1, closeBracketIdx);
        const linkUrl = matchText.slice(closeBracketIdx + 2, -1);
        tokens.push(
          <a
            key={`link-${idx}`}
            href={linkUrl}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        // Inline code
        const codeContent = matchText.slice(1, -1);
        tokens.push(
          <code
            key={`code-${idx}`}
            className="px-1.5 py-0.5 rounded font-mono text-sm bg-gray-100 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400"
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

    // 1. Skip empty lines
    if (!trimmedLine) {
      i++;
      continue;
    }

    // 2. Code Block
    if (trimmedLine.startsWith('```')) {
      const lang = trimmedLine.slice(3).trim();
      let codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const codeText = codeLines.join('\n');
      elements.push(
        <section key={nextKey()} className="my-6">
          <pre className="p-4 rounded-xl overflow-x-auto font-mono text-sm bg-gray-900 text-gray-100 dark:bg-gray-950 dark:text-gray-300 border border-gray-800">
            {lang && (
              <div className="text-xs text-gray-500 dark:text-gray-400 font-sans mb-2 border-b border-gray-800 pb-2 flex justify-between uppercase">
                <span>{lang}</span>
                <span>Code Example</span>
              </div>
            )}
            <code>{codeText}</code>
          </pre>
        </section>
      );
      continue;
    }

    // 3. Table
    if (trimmedLine.startsWith('|')) {
      let tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      // Filter divider lines like |---|---|
      const rows = tableLines
        .map(rowLine => rowLine.split('|').map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1))
        .filter(row => !row.every(cell => cell.startsWith('-')));

      if (rows.length > 0) {
        const headers = rows[0];
        const bodyRows = rows.slice(1);
        elements.push(
          <section key={nextKey()} className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  {headers.map((h, idx) => (
                    <th
                      key={`th-${idx}`}
                      className="px-6 py-3 text-left font-bold text-gray-950 dark:text-white uppercase tracking-wider"
                    >
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
                {bodyRows.map((r, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                    {r.map((c, colIdx) => (
                      <td key={`td-${rowIdx}-${colIdx}`} className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
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

    // 4. Headings
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={nextKey()} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 tracking-tight border-b border-gray-100 dark:border-gray-800 pb-2">
          {renderInline(trimmedLine.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={nextKey()} className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 tracking-tight">
          {renderInline(trimmedLine.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmedLine.startsWith('#### ')) {
      elements.push(
        <h4 key={nextKey()} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2">
          {renderInline(trimmedLine.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // 5. Blockquote
    if (trimmedLine.startsWith('>')) {
      let quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        // Strip out the leading '>' and space
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
          <blockquote className="border-l-4 border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/10 px-6 py-4 rounded-r-xl italic text-gray-800 dark:text-gray-300">
            {renderInline(quoteText)}
          </blockquote>
        </section>
      );
      continue;
    }

    // 6. Unordered List
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      let listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <section key={nextKey()} className="my-4">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
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
      let listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemLine = lines[i].trim();
        const dotIndex = itemLine.indexOf('.');
        listItems.push(itemLine.slice(dotIndex + 1).trim());
        i++;
      }
      elements.push(
        <section key={nextKey()} className="my-4">
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
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
      elements.push(<hr key={nextKey()} className="my-8 border-t border-gray-200 dark:border-gray-800" />);
      i++;
      continue;
    }

    // 9. Standard Paragraph
    elements.push(
      <p key={nextKey()} className="mb-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
        {renderInline(trimmedLine)}
      </p>
    );
    i++;
  }

  return <div className="markdown-body select-text">{elements}</div>;
}
