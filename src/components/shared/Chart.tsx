import { useRef, useEffect, useState } from "react";

type ChartWithIframeProps = {
  html: string;
  autoHeight?: boolean;
};

const ChartWithIframe = ({ html, autoHeight }: ChartWithIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState(0);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    setKey((prev) => prev + 1);
    setContentHeight(null);
  }, [html]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();

    if (!autoHeight) return;

    const measure = () => {
      const h = iframe.contentDocument?.documentElement?.scrollHeight;
      if (h) setContentHeight(h);
    };

    measure();

    const body = iframe.contentDocument?.body;
    if (body) {
      const observer = new ResizeObserver(measure);
      observer.observe(body);
      return () => observer.disconnect();
    }
  }, [key, html, autoHeight]);

  return (
    <iframe
      key={key}
      ref={iframeRef}
      style={{
        width: "100%",
        height: autoHeight
          ? contentHeight !== null
            ? `${contentHeight}px`
            : "400px"
          : "100%",
        border: "none",
      }}
      title="Plotly Chart"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default ChartWithIframe;
