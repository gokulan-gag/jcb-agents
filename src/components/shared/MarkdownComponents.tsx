import { createContext, useContext } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBAL THEME CONFIG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const theme = {
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Source Serif 4', Georgia, serif",
  },
  colors: {
    text: "#1a1a1a",
    textSecondary: "#6b6b6b",
    sectionLabel: "#888",
    dash: "#bbb",
    tip: "#888",
    border: "#e5e5e5",
    blockquoteBg: "#f9f9f9",
    blockquoteAccent: "#d4a017",
    pageBg: "#ffffff",
    tableHeaderBg: "#f5f5f4",
    tableStripeBg: "#fafaf9",
  },
  spacing: {
    sectionGap: "2.5rem",
    itemGap: "1.1rem",
    contentMax: "700px",
    pagePadding: "2.5rem 2rem 4rem",
  },
};

const ThemeContext = createContext(theme);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER — detect key-value table (2 cols, generic headers)
// react-markdown v10 hast nodes don't expose parentNode, so
// we detect at the <table> level (where we have the full node)
// and thread the result down via TableTypeContext.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const KV_HEADERS = ["label", "value", "", " "];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isKeyValueTable(node: any): boolean {
  const thead = node?.children?.find((c: any) => c.tagName === "thead");
  const headerCells = thead?.children?.[0]?.children || [];
  return (
    headerCells.length === 2 &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headerCells.every((cell: any) => {
      const text = (cell.children?.[0]?.value || "").toLowerCase().trim();
      return KV_HEADERS.includes(text);
    })
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTEXTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Tracks whether we're inside a list item (paragraph → span flattening)
const ListItemContext = createContext(false);

// Tracks whether the current table is a key-value or data table
const TableTypeContext = createContext<"kv" | "data">("data");

// Tracks the current row index within tbody (for alternating row stripes)
const RowIndexContext = createContext(0);

// Tracks the current cell index within a tr (for KV label/value column)
const CellIndexContext = createContext(0);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENT OVERRIDES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function H4({ children }: { children?: React.ReactNode }) {
  const t = useContext(ThemeContext);
  return (
    <h4
      style={{
        fontFamily: t.fonts.heading,
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: t.colors.sectionLabel,
        marginTop: t.spacing.sectionGap,
        marginBottom: "1rem",
      }}
    >
      {children}
    </h4>
  );
}

function Paragraph({
  children,
  node,
}: {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node?: any;
}) {
  const t = useContext(ThemeContext);
  const isInsideListItem = useContext(ListItemContext);

  // react-markdown wraps list item text in <p> tags.
  // When inside a list item, render as a plain span with no margin
  // so the dash and text stay aligned on the same line.
  if (isInsideListItem) {
    return <span>{children}</span>;
  }

  // Detect if entire paragraph is italic (tip/callout)
  const isTip =
    node?.children?.length === 1 && node.children[0].tagName === "em";

  if (isTip) {
    return (
      <p
        style={{
          fontStyle: "italic",
          color: t.colors.tip,
          fontSize: "0.92rem",
          lineHeight: 1.65,
          marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {children}
      </p>
    );
  }

  return (
    <p
      style={{
        marginBottom: t.spacing.itemGap,
        fontSize: "1rem",
        lineHeight: 1.7,
        color: t.colors.text,
      }}
    >
      {children}
    </p>
  );
}

function Blockquote({ children }: { children?: React.ReactNode }) {
  const t = useContext(ThemeContext);
  return (
    <blockquote
      style={{
        background: t.colors.blockquoteBg,
        borderLeft: `3.5px solid ${t.colors.blockquoteAccent}`,
        margin: "1.2rem 0",
        padding: "1.2rem 1.5rem",
        borderRadius: "0 4px 4px 0",
        fontSize: "1rem",
        lineHeight: 1.7,
        color: t.colors.text,
      }}
    >
      {children}
    </blockquote>
  );
}

function HrComp() {
  const t = useContext(ThemeContext);
  return (
    <hr
      style={{
        border: "none",
        borderTop: `1px solid ${t.colors.border}`,
        margin: `${t.spacing.sectionGap} 0`,
      }}
    />
  );
}

function UnorderedList({ children }: { children?: React.ReactNode }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 0.5rem 0" }}>
      {children}
    </ul>
  );
}

function ListItemComp({ children }: { children?: React.ReactNode }) {
  const t = useContext(ThemeContext);
  return (
    <ListItemContext.Provider value={true}>
      <li
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
          padding: "0.35rem 0",
          fontSize: "1rem",
          lineHeight: 1.65,
          color: t.colors.text,
        }}
      >
        <span
          style={{
            flexShrink: 0,
            color: t.colors.dash,
            userSelect: "none",
          }}
        >
          —
        </span>
        <span style={{ flex: 1 }}>{children}</span>
      </li>
    </ListItemContext.Provider>
  );
}

function StrongComp({ children }: { children?: React.ReactNode }) {
  return <strong style={{ fontWeight: 700 }}>{children}</strong>;
}

function EmComp({ children }: { children?: React.ReactNode }) {
  return <em>{children}</em>;
}

// ── Table ──

function TableComp({
  children,
  node,
}: {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node?: any;
}) {
  const t = useContext(ThemeContext);
  const tableIsKV = isKeyValueTable(node);

  if (tableIsKV) {
    return (
      <TableTypeContext.Provider value="kv">
        <div style={{ margin: "0.5rem 0 1rem" }}>{children}</div>
      </TableTypeContext.Provider>
    );
  }

  return (
    <TableTypeContext.Provider value="data">
      <div style={{ margin: "1rem 0 1.5rem", overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.92rem",
            fontFamily: t.fonts.heading,
            whiteSpace: "normal",
            border: "none",
          }}
        >
          {children}
        </table>
      </div>
    </TableTypeContext.Provider>
  );
}

function TheadComp({ children }: { children?: React.ReactNode }) {
  const t = useContext(ThemeContext);
  const tableType = useContext(TableTypeContext);

  // KV tables have no visible header row
  if (tableType === "kv") return null;

  return (
    <thead style={{ background: t.colors.tableHeaderBg }}>{children}</thead>
  );
}

function ThComp({ children }: { children?: React.ReactNode }) {
  const t = useContext(ThemeContext);
  return (
    <th
      style={{
        padding: "0.6rem 0.85rem",
        textAlign: "left",
        fontWeight: 600,
        fontSize: "0.72rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: t.colors.sectionLabel,
        borderBottom: `2px solid ${t.colors.border}`,
        background: "none",
        borderRight: "none",
      }}
    >
      {children}
    </th>
  );
}

// TbodyComp stamps each row with its index so TdComp can stripe.
// KV tables use a plain <div> wrapper so App.css table rules don't interfere.
function TbodyComp({ children }: { children?: React.ReactNode }) {
  const tableType = useContext(TableTypeContext);
  const rows = React.Children.toArray(children);

  if (tableType === "kv") {
    return (
      <div>
        {rows.map((row, rowIndex) => (
          <RowIndexContext.Provider key={rowIndex} value={rowIndex}>
            {row}
          </RowIndexContext.Provider>
        ))}
      </div>
    );
  }

  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <RowIndexContext.Provider key={rowIndex} value={rowIndex}>
          {row}
        </RowIndexContext.Provider>
      ))}
    </tbody>
  );
}

// TrComp stamps each cell with its column index so TdComp can detect KV columns.
// KV rows are full-width flex containers.
function TrComp({ children }: { children?: React.ReactNode }) {
  const tableType = useContext(TableTypeContext);
  const cells = React.Children.toArray(children);

  if (tableType === "kv") {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        {cells.map((cell, cellIndex) => (
          <CellIndexContext.Provider key={cellIndex} value={cellIndex}>
            {cell}
          </CellIndexContext.Provider>
        ))}
      </div>
    );
  }

  return (
    <tr style={{ background: "transparent" }}>
      {cells.map((cell, cellIndex) => (
        <CellIndexContext.Provider key={cellIndex} value={cellIndex}>
          {cell}
        </CellIndexContext.Provider>
      ))}
    </tr>
  );
}

function TdComp({ children }: { children?: React.ReactNode }) {
  const t = useContext(ThemeContext);
  const tableType = useContext(TableTypeContext);
  const rowIndex = useContext(RowIndexContext);
  const colIndex = useContext(CellIndexContext);

  // KV tables: div-based cells so the flex row fills the container width.
  // col 0 = label (auto width, muted), col 1 = value (takes remaining space, right-aligned).
  if (tableType === "kv") {
    return (
      <div
        style={{
          flex: colIndex === 0 ? "0 0 auto" : "1",
          padding: "0.55rem 0",
          borderBottom: `1px solid ${t.colors.border}`,
          fontSize: "0.95rem",
          color: colIndex === 0 ? t.colors.textSecondary : t.colors.text,
          textAlign: colIndex === 0 ? "left" : "right",
        }}
      >
        {children}
      </div>
    );
  }

  // Data table — alternating row stripes
  const isStriped = rowIndex % 2 === 1;

  return (
    <td
      style={{
        padding: "0.55rem 0.85rem",
        borderBottom: `1px solid ${t.colors.border}`,
        borderRight: "none",
        color: t.colors.text,
        background: isStriped ? t.colors.tableStripeBg : "transparent",
      }}
    >
      {children}
    </td>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTS MAP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const markdownComponents: Components = {
  h4: H4,
  p: Paragraph,
  blockquote: Blockquote,
  hr: HrComp,
  ul: UnorderedList,
  li: ListItemComp,
  strong: StrongComp,
  em: EmComp,
  table: TableComp,
  thead: TheadComp,
  th: ThComp,
  tbody: TbodyComp,
  tr: TrComp,
  td: TdComp,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MARKDOWN RENDERER — wraps ReactMarkdown with theme context
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface MarkdownRendererProps {
  children: string;
}

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return (
    <ThemeContext.Provider value={theme}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {children}
      </ReactMarkdown>
    </ThemeContext.Provider>
  );
}
