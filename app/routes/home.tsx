import PersonalInfo from "~/components/personal-info";
import type { Route } from "./+types/home";
import Resume from "~/components/resume";
import TOC from "~/components/toc";
import { useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Barinderpreet Singh" },
    { name: "description", content: "Welcome to React Router!" },
  ];
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
