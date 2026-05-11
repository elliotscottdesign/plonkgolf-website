// next/image with `unoptimized: true` doesn't apply basePath on static export.
// A custom loader is the official workaround — Next.js calls this for every
// <Image> src and uses our return value as the final URL.
const BASE_PATH = process.env.GITHUB_PAGES === "true" ? "/plonkgolf-website" : "";

export default function imageLoader({ src }) {
  // Don't touch absolute URLs
  if (/^https?:\/\//.test(src)) return src;
  return `${BASE_PATH}${src.startsWith("/") ? "" : "/"}${src}`;
}
