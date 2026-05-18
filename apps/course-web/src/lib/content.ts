import fs from "node:fs";
import path from "node:path";

const COURSE_ROOT = path.resolve(process.cwd(), "../../");
const COURSE_DIR = path.join(COURSE_ROOT, "course");
const LABS_DIR = path.join(COURSE_ROOT, "labs");

export function readCourseMarkdown(sourceFile: string) {
  return fs.readFileSync(path.join(COURSE_DIR, sourceFile), "utf8");
}

export function readLabMarkdown(labSlug: string) {
  const filePath = path.join(LABS_DIR, labSlug, "README.md");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

export type MarkdownBlock =
  | { type: "heading"; level: number; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; lang: string; code: string };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let listOrdered = false;
  let code: string[] | null = null;
  let codeLang = "";
  let table: string[] = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length) {
      blocks.push({ type: "list", items: list, ordered: listOrdered });
      list = [];
      listOrdered = false;
    }
  }

  function flushTable() {
    if (table.length >= 2) {
      const [headerLine, separatorLine, ...rowLines] = table;
      const isSeparator = separatorLine
        .split("|")
        .filter(Boolean)
        .every((cell) => /^:?-{3,}:?$/.test(cell.trim()));

      if (isSeparator) {
        const toCells = (row: string) =>
          row
            .trim()
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((cell) => cell.trim());

        blocks.push({
          type: "table",
          headers: toCells(headerLine),
          rows: rowLines.map(toCells)
        });
      } else {
        blocks.push({ type: "paragraph", text: table.join(" ") });
      }
    } else if (table.length === 1) {
      blocks.push({ type: "paragraph", text: table[0] });
    }

    table = [];
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (code) {
        blocks.push({ type: "code", lang: codeLang, code: code.join("\n") });
        code = null;
        codeLang = "";
      } else {
        flushParagraph();
        flushList();
        flushTable();
        code = [];
        codeLang = line.replace("```", "").trim();
      }
      continue;
    }

    if (code) {
      code.push(line);
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushTable();
      const text = headingMatch[2];
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text,
        id: slugify(text)
      });
      continue;
    }

    const unorderedMatch = line.trim().match(/^- (.*)$/);
    const orderedMatch = line.trim().match(/^\d+\.\s+(.*)$/);

    if (unorderedMatch || orderedMatch) {
      flushParagraph();
      flushTable();
      const ordered = Boolean(orderedMatch);

      if (list.length && listOrdered !== ordered) {
        flushList();
      }

      listOrdered = ordered;
      list.push((orderedMatch ?? unorderedMatch)?.[1] ?? "");
      continue;
    }

    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushParagraph();
      flushList();
      table.push(line.trim());
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    flushTable();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushTable();

  return blocks;
}
