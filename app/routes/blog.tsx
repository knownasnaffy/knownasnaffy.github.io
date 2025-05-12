import PersonalInfo from "~/components/personal-info";
import type { Route } from "./+types/home";
import BlogComingSoon from "~/components/blog-coming-soon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BlogHomePage() {
  return (
    <>
      <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[296px_1fr_250px] min-h-screen">
        <PersonalInfo />
        <BlogComingSoon />
        <aside className="sticky top-0 h-screen hidden xl:block border-l px-8 py-8">
          <h3 id="toc" className=" font-semibold">
            Table of Contents
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {"Nothing here yet"}
          </p>
        </aside>
      </main>
    </>
  );
}
