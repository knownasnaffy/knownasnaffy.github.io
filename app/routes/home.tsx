import PersonalInfo from "~/components/personal-info";
import type { Route } from "./+types/home";
import Resume from "~/components/resume";
import TOC from "~/components/toc";
import { useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Barinderpreet Singh" },
    {
      name: "description",
      content:
        "Full-stack developer portfolio featuring projects, skills, and experience.",
    },
    {
      name: "keywords",
      content:
        "Barinderpreet Singh, Full Stack Developer, React, Next.js, Tailwind, Portfolio, Web Developer India",
    },
    {
      name: "author",
      content: "Barinderpreet Singh",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      property: "og:title",
      content: "Portfolio | Barinderpreet Singh",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://barinderpreet.com",
    },
    {
      property: "og:image",
      content: "/meta-preview.png",
    },
  ];
}

export function links({}: Route.LinksFunction) {
  return [{ rel: "canonical", href: "https://barinderpreet.com" }];
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[296px_1fr_250px] min-h-screen">
        <PersonalInfo />
        <Resume mainRef={mainRef} />
        <aside className="sticky top-0 h-screen hidden xl:block border-l px-8 py-8">
          <h3 id="toc" className=" font-semibold">
            Table of Contents
          </h3>
          <TOC mainRef={mainRef} />
        </aside>
      </main>
    </>
  );
}
