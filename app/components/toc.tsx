import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export default function TOC({
  mainRef,
}: {
  mainRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Collect all direct child h2s of #main
  useEffect(() => {
    const h2s = mainRef.current?.querySelectorAll(":scope > h2");
    const newHeadings: { id: string; text: string }[] = [];

    h2s?.forEach((h2, index) => {
      if (!h2.id) h2.id = `heading-${index}`;
      newHeadings.push({
        id: h2.id,
        text: h2.textContent || `Heading ${index}`,
      });
    });

    setHeadings(newHeadings);
  }, []);

  // Track which h2 is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px", // triggers slightly before fully in view
        threshold: 0,
      }
    );

    const h2s = mainRef.current?.querySelectorAll(":scope > h2");
    h2s?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  return (
    <ul className="mt-2 space-y-1 text-sm">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className={cn(
              "text-muted-foreground hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-[3px] ring-offset-2 ring-offset-background rounded-xs transition-all",
              activeId === h.id && "text-foreground"
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
