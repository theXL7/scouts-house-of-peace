export const BASE_PATH = "/scouts-house-of-peace";
const isProd = process.env.NODE_ENV === "production";

export function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!isProd) {
    return normalizedPath;
  }

  return `${BASE_PATH}${normalizedPath}`;
}
