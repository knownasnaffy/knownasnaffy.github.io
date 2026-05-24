export const SITE = {
  website: "https://blog.barinr.xyz/",
  author: "Barinderpreet Singh",
  profile: "https://github.com/knownasnaffy",
  desc: "A blog to share my thoughts and projects while I learn new things.",
  title: "Barinderpreet Singh",
  ogImage: "devosfera-og.webp", // located in the public folder
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 12,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showGalleries: true,
  showJourney: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit this post",
    url: "https://github.com/knownasnaffy/blog-v2/edit/main"
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Kolkata", // Default global timezone (IANA format)
  introAudio: {
    enabled: false, // show/hide the player in the hero section
    src: "/audio/intro-web.mp3", // path to the file (relative to /public)
    label: "INTRO.MP3", // display label in the player
    duration: 30, // duration in seconds (for the fixed progress bar)
  },
} as const;
