import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function buildBlogDetailsUrl(id: string, title: string) {
  const slug = createSlug(title)

  return slug ? `/blog/details/${slug}--${id}` : `/blog/details/${id}`
}

export function getBlogIdCandidates(param: string) {
  if (!param.includes("--")) return [param]

  const parts = param.split("--")
  return [parts.at(-1) ?? param, parts[0] ?? param]
}
