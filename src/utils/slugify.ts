import slugify from "slugify";

export const slugifyStr = (str: string) =>
  slugify(str, {
    lower: true,
    strict: true, // remove punctuation
    trim: true,
  });

export const slugifyAll = (arr: string[]) => arr.map(slugifyStr);
