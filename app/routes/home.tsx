import PersonalInfo from "~/components/personal-info";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[296px_1fr_250px] min-h-screen">
        <PersonalInfo />
        <div className="px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-0 prose-h1:border-b prose-h1:pb-4 max-w-2xl mx-auto">
          <h1 className="">Resume</h1>
          <h2 id="about-heading" className="mt-6">
            Professional Summary
          </h2>
          <p className="">
            Self-taught <b>web developer</b> and B.Tech CSE student with{" "}
            <b>2+ years</b> of hands-on experience building{" "}
            <b>full-stack applications</b> and
            <b> desktop software</b>. Strong foundation in <b>React</b>,
            Next.js, and
            <b> Tailwind</b>, with a growing interest in clean design systems,
            CI/CD workflows, and developer tooling. Currently maintaining
            multiple personal and academic projects while working part-time as a
            freelance developer.
          </p>
          <h2 className="">Skills & Technologies</h2>
          <ul className="">
            <li>
              <b>Frontend:</b> React, Next.js, Tailwind CSS, ShadCN, daisyUI,
              Vite, React Router
            </li>
            <li>
              <b>Backend:</b> Node.js (basic), REST APIs, JWT, OAuth
            </li>
            <li>
              <b>State Management:</b> Redux, Zustand
            </li>
            <li>
              <b>Tooling:</b> Bun, pnpm, Prettier, ESLint, Git, GitHub Actions
            </li>
            <li>
              <b>Deployment:</b> GitHub Pages, Vercel, Custom Domain Management
            </li>
            <li>
              <b>Design:</b> Figma, Semantic HTML, Accessibility Best Practices
            </li>
          </ul>
        </div>
        <aside className="sticky top-0 h-screen hidden lg:block border-l px-8 py-8">
          <h3 id="toc" className=" font-semibold">
            Table of Contents
          </h3>
          <ul className=" mt-2 space-y-1 text-sm">
            <li>
              <a
                href="#section1"
                className="text-muted-foreground hover:text-foreground"
              >
                Professional Higlights
              </a>
            </li>
            <li>
              <a
                href="#section2"
                className="text-muted-foreground hover:text-foreground"
              >
                Core Skills
              </a>
            </li>
            <li>
              <a
                href="#section3"
                className="text-muted-foreground hover:text-foreground"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#section4"
                className="text-muted-foreground hover:text-foreground"
              >
                Section 4
              </a>
            </li>
            <li>
              <a
                href="#section5"
                className="text-muted-foreground hover:text-foreground"
              >
                Section 5
              </a>
            </li>
          </ul>
        </aside>
      </main>
    </>
  );
}
