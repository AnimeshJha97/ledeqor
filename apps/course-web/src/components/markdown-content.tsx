import { MermaidDiagram } from "@/components/mermaid-diagram";
import type { MarkdownBlock } from "@/lib/content";

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[0.92em] text-cyan-200">
              {part.slice(1, -1)}
            </code>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function MarkdownContent({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <article className="max-w-full space-y-5 overflow-hidden">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const className =
            block.level === 1
              ? "text-3xl font-semibold text-ink"
              : block.level === 2
                ? "pt-6 text-2xl font-semibold text-ink"
                : "pt-3 text-lg font-semibold text-slate-100";

          if (block.level === 1) {
            return <h2 key={`${block.id}-${index}`} id={block.id} className={`${className} scroll-mt-24`}>{block.text}</h2>;
          }

          if (block.level === 2) {
            return <h3 key={`${block.id}-${index}`} id={block.id} className={`${className} scroll-mt-24`}>{block.text}</h3>;
          }

          return <h4 key={`${block.id}-${index}`} id={block.id} className={`${className} scroll-mt-24`}>{block.text}</h4>;
        }

        if (block.type === "paragraph") {
          if (block.text.trim() === "---") {
            return <hr key={index} className="border-line" />;
          }

          return (
            <p key={index} className="max-w-3xl break-words text-base leading-7 text-slate-300">
              <InlineCode text={block.text} />
            </p>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";

          return (
            <ListTag key={index} className={`grid max-w-3xl gap-2 text-slate-300 ${block.ordered ? "list-decimal pl-6" : ""}`}>
              {block.items.map((item) => (
                block.ordered ? (
                  <li key={item} className="min-w-0 break-words leading-7">
                    <InlineCode text={item} />
                  </li>
                ) : (
                  <li key={item} className="flex gap-3 leading-7">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span className="min-w-0 break-words">
                      <InlineCode text={item} />
                    </span>
                  </li>
                )
              ))}
            </ListTag>
          );
        }

        if (block.type === "code") {
          if (block.lang === "mermaid") {
            return <MermaidDiagram key={index} chart={block.code} />;
          }

          return (
            <pre key={index} className="max-w-full overflow-auto rounded-md border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="max-w-full overflow-x-auto rounded-md border border-line">
              <table className="min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-panel text-slate-100">
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header} className="border-b border-line px-4 py-3 font-semibold">
                        <InlineCode text={header} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate-300">
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="bg-surface/60">
                      {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`} className="max-w-[280px] px-4 py-3 align-top leading-6">
                          <InlineCode text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </article>
  );
}
