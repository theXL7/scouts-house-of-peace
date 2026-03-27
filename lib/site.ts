export const siteBasePath = "/scouts-house-of-peace";

// Public assets need the repo path on GitHub Pages, so we build the full URL once here.
export function withBasePath(path: string) {
  return `${siteBasePath}${path}`;
}
