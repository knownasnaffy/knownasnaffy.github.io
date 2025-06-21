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
    title: "B.Tech. in CSE",
    description: "Baba Banda Singh Bahadur College, Fatehgarh Sahib",
    timeline: (
      <>
        August 2024 - May 2028 <i>(Expected)</i>
      </>
    ),
    content: (
      <>
        <h4 className="font-bold text-foreground">Highlights:</h4>
        <p className="text-secondary-foreground">
          <ul>
            <li className="flex items-start">
              <span className="mr-3.5 ml-1 text-muted-foreground">•</span>
              <span>
                <i className="text-foreground underline underline-offset-2">
                  Selected
                </i>{" "}
                for the college{" "}
                <i className="text-foreground underline underline-offset-2">
                  ERP development
                </i>{" "}
                team in the first semester.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3.5 ml-1 text-muted-foreground">•</span>
              <span>
                Secured{" "}
                <i className="text-foreground underline underline-offset-2">
                  2nd place
                </i>{" "}
                in an internal college{" "}
                <i className="text-foreground underline underline-offset-2">
                  hackathon
                </i>{" "}
                (Oct 2024).
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3.5 ml-1 text-muted-foreground">•</span>
              <span>
                Co-coordinated the Science Day celebration event (Mar 2025),
                managing planning and logistics with a peer.
              </span>
            </li>
          </ul>
        </p>
      </>
    ),
  },
];

export default function EducationList() {
  return (
    <Accordion type="multiple" className="w-full not-prose space-y-3">
      {items.map((item) => (
        <AccordionItem
          value={item.id}
          key={item.id}
          className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-2 outline-none last:border-b has-focus-visible:ring-[3px] transition-all"
          onKeyDown={(event) => {
            const keysToBlock = [
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
            ];
            if (keysToBlock.includes(event.key)) {
              // event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="focus-visible:ring-0 grid gap-1 rounded-md py-2 w-full text-left text-base leading-6 font-semibold transition-all outline-none [&_svg>path:last-child]:origin-center [&_svg>path:last-child]:transition-all [&_svg>path:last-child]:duration-200 [&[data-state=open]_svg]:rotate-180 [&[data-state=open]_svg>path:last-child]:rotate-90 [&[data-state=open]_svg>path:last-child]:opacity-0 hover:cursor-pointer">
              <span className="flex items-start lg:items-center justify-start w-full">
                <span className="text-foreground flex flex-col lg:flex-row">
                  {item.title}
                  <span className="text-muted-foreground text-sm lg:ml-2 leading-[inherit] font-normal">
                    {item.timeline}
                  </span>
                </span>
                <PlusIcon
                  size={16}
                  className="text-muted-foreground pointer-events-none shrink-0 opacity-60 transition-transform duration-200 ml-auto max-lg:my-1"
                  aria-hidden="true"
                />
              </span>
              <span className="text-secondary-foreground text-sm font-normal">
                {item.description}
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          {/*  NOTE: `prose-h4:font-bold` not working in the classname  */}
          <AccordionContent className="prose prose-sm dark:prose-invert py-2 text-secondary-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
