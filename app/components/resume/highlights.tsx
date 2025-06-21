export default function Highlights() {
  return (
    <>
      <div className="rounded-md border px-4">
        <h4 className="text-foreground">Professional Summary</h4>
        <p>
          Self-taught full-stack developer and B.Tech CSE student crafting
          performant web and desktop apps with modern tooling.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mt-3 md:text-center [&>div]:flex [&>div]:flex-col [&>div]:justify-center">
        <div className="rounded-md border px-4">
          <h4 className="text-foreground">2+ Years</h4>
          <p>Hands-on dev experience</p>
        </div>
        <div className="rounded-md border px-4">
          <h4 className="text-foreground">Freelance + Academic</h4>
          <p>Balanced, real-world exposure</p>
        </div>
      </div>
    </>
  );
}
