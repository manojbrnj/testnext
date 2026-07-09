import { db } from "@/lib/db";
import { buildBlogDetailsUrl } from "@/lib/utils";

export default async function sitemap() {
  const posts = await db.blog.findMany();

  return posts.map(({ id, createdAt, title }) => ({
    url: `https://voiceofamuse.com${buildBlogDetailsUrl(id, title)}`,
    lastModified: createdAt,
    title,
  }));
}