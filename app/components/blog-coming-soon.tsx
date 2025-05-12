import { Link } from "react-router";

export default function BlogComingSoon() {
  return (
    <div className="px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-4 prose-h1:border-b prose-h1:pb-4 max-w-2xl w-full md:mx-auto">
      <h1 className="flex max-md:flex-col items-baseline">
        Blog
        <span className="not-prose text-white/50 font-normal text-xl md:ml-2">
          Coming Soon
        </span>
      </h1>
      <Link to="/">Back to the home page</Link>
    </div>
  );
}
