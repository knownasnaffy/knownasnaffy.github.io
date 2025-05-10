import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "~/components/ui/accordion";

const items = [
  {
    id: "1",
    //  TODO: Add an abbreviation here to tell how &iary is spelled
    title: "&iary",
    description:
      "A lightweight, private journaling app built with Python and Tkinter.",
    timeline: (
      <>
        Nov 2021 <i>Present</i>
      </>
    ),
    content: (
      <>
        <h4 className="font-bold">The Problem:</h4>
        <p>
          I wanted a no-frills, write-only journaling app that{" "}
          <i className="underline underline-offset-2">
            automatically tracked the date
          </i>{" "}
          of each entry without manual input — something distraction-free and
          private.
        </p>
        <h4 className="font-bold mt-3">The Solution:</h4>
        <p>
          I built &iary using{" "}
          <i className="underline underline-offset-2">Python</i> and{" "}
          <i className="underline underline-offset-2">Tkinter</i>. The app
          launched into a blank window with no navigation or history — just a
          space to write. Each entry was timestamped and saved locally to keep
          things simple and private.
        </p>
        <h4 className="font-bold mt-3">Tech Decisions:</h4>
        <p>
          Tkinter was{" "}
          <i className="underline underline-offset-2">lightweight</i> and
          well-suited for my limited hardware. It allowed me to quickly
          prototype a functional UI without external dependencies. I kept the UI
          intentionally minimal to align with the write-only philosophy.
        </p>
        <h4 className="font-bold mt-3">Outcome / Learnings:</h4>
        <p>
          &iary taught me how to handle UI events, file storage, and basic state
          management. It was also my first experience thinking deeply about UX,
          even in a basic app. This project eventually led to the much more
          advanced <i className="underline underline-offset-2">Inner Ink</i>.
        </p>
      </>
    ),
  },
  {
    id: "2",
    title: "Inner Ink",
    description:
      "A privacy-first journaling app with modern UI and Markdown support.",
    timeline: (
      <>
        Nov 2023 - <i>Present</i>
      </>
    ),
    content: (
      <>
        <h4 className="font-bold">The Problem:</h4>
        <p>
          After switching to a new laptop with Windows 11, I felt that my older
          journaling app ("&iary" built in Tkinter){" "}
          <i className="underline underline-offset-2">looked outdated</i> and
          lacked formatting options. I also wanted a feature to view past
          entries with a searchable interface.
        </p>
        <h4 className="font-bold mt-3">The Solution:</h4>
        <p>
          I designed Inner Ink as a modern journaling app focused on minimalism
          and privacy. It allows{" "}
          <i className="underline underline-offset-2">rich-text editing</i> (via
          Markdown), <i className="underline underline-offset-2">searching</i>{" "}
          past entries, and{" "}
          <i className="underline underline-offset-2">filtering</i> by date. All
          data is stored locally to maintain privacy.
        </p>
        <h4 className="font-bold mt-3">Tech Decisions:</h4>
        <p>
          I chose Tauri for its{" "}
          <i className="underline underline-offset-2">low memory usage</i>{" "}
          compared to Electron. The frontend is built with React and
          TailwindCSS, with Zustand for state management. This stack gave me
          flexibility and snappy performance.
        </p>
        <h4 className="font-bold mt-3">Outcome / Learnings:</h4>
        <p>
          This project taught me a lot about{" "}
          <i className="underline underline-offset-2">modular design</i>,
          cross-platform packaging, and managing local file systems in a secure,
          efficient way. I also developed a better understanding of{" "}
          <i className="underline underline-offset-2">user-focused design</i>{" "}
          and Markdown parsing.
        </p>
      </>
    ),
  },
  {
    id: "3",
    title: "College ERP System",
    description:
      "Collaborative ERP solution for internal academic and admin processes.",
    timeline: (
      <>
        Nov 2024 - <i>Present</i>
      </>
    ),
    content: (
      <>
        <h4 className="font-bold">The Context:</h4>
        <p>
          I joined the project during its early development phase in my first
          semester as part of a two-member team. The stack and direction were
          already defined, but I took on the frontend responsibilities and
          helped develop key student and faculty-facing features.
        </p>
        <h4 className="font-bold mt-3">My Role:</h4>
        <p>
          I worked on dynamic forms, integrated UI components, and wrote
          maintainable code across multiple sections, where I got hands-on
          experience with structured form logic, state updates, and interfacing
          with backend APIs.
        </p>
        <h4 className="font-bold mt-3">What I Learned:</h4>
        <p>
          This was my first real-world experience working in a team with defined
          roles, Git workflows, and long-term planning. I learned to work within
          constraints, maintain clean code in shared environments, and develop
          for real users.
        </p>
      </>
    ),
  },
];

export default function ProjectsList() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full not-prose space-y-3"
      defaultValue="3"
    >
      {items.map((item) => (
        <AccordionItem
          value={item.id}
          key={item.id}
          className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-2 outline-none last:border-b has-focus-visible:ring-[3px] transition-all"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="focus-visible:ring-0 grid gap-1 rounded-md py-2 w-full text-left text-base leading-6 font-semibold transition-all outline-none [&_svg>path:last-child]:origin-center [&_svg>path:last-child]:transition-all [&_svg>path:last-child]:duration-200 [&[data-state=open]_svg]:rotate-180 [&[data-state=open]_svg>path:last-child]:rotate-90 [&[data-state=open]_svg>path:last-child]:opacity-0 hover:cursor-pointer">
              <span className="flex items-center justify-start w-full">
                {item.title}
                <span className="text-muted-foreground text-sm ml-2 leading-[inherit] font-normal">
                  {item.timeline}
                </span>

                <PlusIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200 ml-auto"
                  aria-hidden="true"
                />
              </span>
              <span className="text-[#D1D5DC] text-sm font-normal">
                {item.description}
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          {/*  NOTE: `prose-h4:font-bold` not working in the classname  */}
          <AccordionContent className="prose prose-sm dark:prose-invert py-2">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
