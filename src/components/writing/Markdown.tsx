// src/components/writing/Markdown.tsx
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * A dependency-free Markdown renderer tuned for the portfolio's dark theme.
 * Supports: # headings, ```code fences```, > quotes, - and 1. lists,
 * ![images](), [links](), **bold**, *italic*, `inline code`, --- rules.
 *
 * For very advanced Markdown (tables, footnotes, nested lists) consider
 * swapping this for `react-markdown` + `remark-gfm`. For a dev blog this
 * covers everything you need with zero bundle cost.
 */

interface MarkdownProps {
  content: string;
}

// ---------- Inline formatting ----------

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Order matters: images, links, bold, italic, inline code
  const pattern =
    /(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];

    if (token.startsWith('![')) {
      const m = /!\[([^\]]*)\]\(([^)]+)\)/.exec(token);
      if (m) {
        nodes.push(
          <img
            key={`${keyPrefix}-img-${i}`}
            src={m[2]}
            alt={m[1]}
            className="inline-block max-w-full rounded"
          />
        );
      }
    } else if (token.startsWith('[')) {
      const m = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (m) {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${i}`}
            href={m[2]}
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 underline underline-offset-4 decoration-amber-400/40 hover:decoration-amber-400 transition-colors"
          >
            {m[1]}
          </a>
        );
      }
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*')) {
      nodes.push(
        <em key={`${keyPrefix}-i-${i}`} className="italic text-zinc-200">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`')) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i}`}
          className="font-mono text-[0.85em] bg-white/[0.06] border border-white/[0.08] text-amber-300 px-1.5 py-0.5 rounded"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = match.index + token.length;
    i++;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

// ---------- Code block ----------

const CodeBlock: React.FC<{ code: string; lang: string }> = ({
  code,
  lang,
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/[0.08] bg-black/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          {lang && (
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {lang}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 hover:text-amber-400 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-zinc-300">{code}</code>
      </pre>
    </div>
  );
};

// ---------- Block parser ----------

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // --- Code fence ---
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <CodeBlock key={key++} code={codeLines.join('\n')} lang={lang} />
      );
      continue;
    }

    // --- Heading ---
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const cls: Record<number, string> = {
        1: 'font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] text-white mt-12 mb-4',
        2: 'font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] text-white mt-10 mb-3',
        3: 'font-display text-xl md:text-2xl font-medium tracking-[-0.01em] text-white mt-8 mb-3',
        4: 'font-mono text-[11px] uppercase tracking-[0.18em] text-amber-400 mt-8 mb-3',
      };
      // Fixed: use React.ElementType to avoid JSX namespace error
      const Tag = `h${Math.min(level + 1, 6)}` as React.ElementType;
      blocks.push(
        <Tag key={key++} className={cls[level]}>
          {renderInline(text, `h${key}`)}
        </Tag>
      );
      i++;
      continue;
    }

    // --- Horizontal rule ---
    if (/^---+$/.test(line.trim())) {
      blocks.push(
        <hr key={key++} className="my-10 border-t border-white/[0.08]" />
      );
      i++;
      continue;
    }

    // --- Blockquote ---
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="my-6 pl-5 border-l-2 border-amber-400 font-display text-xl md:text-2xl italic font-light text-white/90 leading-relaxed"
        >
          {renderInline(quoteLines.join(' '), `q${key}`)}
        </blockquote>
      );
      continue;
    }

    // --- Image (standalone) ---
    const img = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line.trim());
    if (img) {
      blocks.push(
        <figure key={key++} className="my-8">
          <img
            src={img[2]}
            alt={img[1]}
            loading="lazy"
            className="w-full rounded-xl border border-white/[0.08]"
          />
          {img[1] && (
            <figcaption className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500">
              {img[1]}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // --- Unordered list ---
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-5 space-y-2">
          {items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-3 text-zinc-300">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span className="leading-relaxed">
                {renderInline(it, `ul${key}-${idx}`)}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // --- Ordered list ---
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-5 space-y-2">
          {items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-3 text-zinc-300">
              <span className="font-mono text-[12px] text-amber-400 mt-0.5 flex-shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="leading-relaxed">
                {renderInline(it, `ol${key}-${idx}`)}
              </span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // --- Blank line ---
    if (line.trim() === '') {
      i++;
      continue;
    }

    // --- Paragraph (gather consecutive non-empty lines) ---
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('>') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p
        key={key++}
        className="my-4 text-zinc-300 text-base md:text-[17px] leading-[1.8]"
      >
        {renderInline(paraLines.join(' '), `p${key}`)}
      </p>
    );
  }

  return <div className="markdown-body">{blocks}</div>;
};

export default Markdown;