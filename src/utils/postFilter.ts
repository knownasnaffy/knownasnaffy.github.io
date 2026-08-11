import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  return !data.draft;
};

export default postFilter;
