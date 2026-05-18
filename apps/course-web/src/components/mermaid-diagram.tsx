"use client";

import mermaid from "mermaid";
import { useEffect, useId, useState } from "react";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#0e7490",
    primaryTextColor: "#f8fafc",
    primaryBorderColor: "#22d3ee",
    lineColor: "#94a3b8",
    secondaryColor: "#7c2d12",
    tertiaryColor: "#111c2b",
    fontFamily: "Geist, ui-sans-serif, system-ui"
  }
});

export function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let active = true;

    mermaid
      .render(`mermaid-${id}`, chart)
      .then((result) => {
        if (active) {
          setSvg(result.svg);
        }
      })
      .catch(() => {
        if (active) {
          setSvg("");
        }
      });

    return () => {
      active = false;
    };
  }, [chart, id]);

  if (!svg) {
    return (
      <pre className="max-w-full overflow-auto rounded-md border border-line bg-slate-950 p-4 text-sm text-slate-100">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div className="max-w-full overflow-auto rounded-md border border-line bg-panel p-4 shadow-sm">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
