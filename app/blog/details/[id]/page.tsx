
import { auth } from "@/auth";
import type { Metadata } from "next";

import Reactions from "@/components/blog/Reactions";

import Alert from "@/components/common/Alert";
import Tag from "@/components/common/Tag";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

import './editor.css'
import { getBlogById } from "@/actions/blogs/get-blogById";
import UserSummery from "@/components/blog/UserSummery";
import BlockNoteEditor from "@/components/blog/editor/BlogNoteEditor";
import Comments from "@/components/comments/Comments";
import { buildBlogDetailsUrl, getBlogIdCandidates } from "@/lib/utils";
//import Comments from "@/components/comments/Comments";

const siteUrl = "https://voiceofamuse.com";

function resolveAbsoluteUrl(url: string) {
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}

interface BlogContentProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const blogIdCandidates = getBlogIdCandidates(id)

    let res: Awaited<ReturnType<typeof getBlogById>> | undefined

    for (const blogId of blogIdCandidates) {
        res = await getBlogById({ blogId })
        if (res.success && res.success.blog) break
    }

    if (res?.success && res.success.blog) {
        const blog = res.success.blog
        const description = blog.content
            ? blog.content.replace(/<[^>]*>/g, "").slice(0, 160)
            : `Read ${blog.title} on the blog.`

        const imageUrl = blog.coverImage ? resolveAbsoluteUrl(blog.coverImage) : undefined
        return {
            title: blog.title,
            description,
            openGraph: {
                title: blog.title,
                description,
                type: "article",
                images: imageUrl ? [{ url: imageUrl, alt: blog.title }] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: blog.title,
                description,
                images: imageUrl ? [imageUrl] : [],
            },
        }
    }

    return {
        title: "Blog",
        description: "Read this blog post.",
    }
}

const BlogContent = async ({ params }: BlogContentProps) => {
    const session = await auth()

    const { id } = await params
    const blogIdCandidates = getBlogIdCandidates(id)

    let res: Awaited<ReturnType<typeof getBlogById>> | undefined

    for (const blogId of blogIdCandidates) {
        res = await getBlogById({ blogId })
        if (res.success && res.success.blog) break
    }

    if (!res?.success) return <Alert error message="Error fetching blog content" />

    const blog = res.success.blog

    if (!blog) return <Alert error message="No blog found!" />

    const blogUrl = `https://voiceofamuse.com${buildBlogDetailsUrl(blog.id, blog.title)}`

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.content.replace(/<[^>]*>/g, "").slice(0, 160),
            image: blog.coverImage ? [blog.coverImage] : [],
            datePublished: blog.createdAt.toISOString(),
            dateModified: blog.createdAt.toISOString(),
            author: {
                "@type": "Person",
                name: blog.user?.name || "Unknown author",
            },
            url: blogUrl,
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://voiceofamuse.com",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: "https://voiceofamuse.com/blog/feed",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: blog.title,
                    item: blogUrl,
                },
            ],
        },
    ]

    return (<div className="flex flex-col max-w-[900px] m-auto gap-6">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {blog.coverImage && <div className="relative w-full h-[35vh] mt-2">
            <Image src={blog.coverImage} fill alt="Cover Image" className="object-cover rounded" />
        </div>}
        <div className="flex justify-between items-center pt-4">
            {blog.user && <UserSummery user={blog.user} createdDate={blog.createdAt} />}
            {session?.user.id === blog.userId && <Link className="text-orange-400" href={`/blog/edit/${blog.id}`}>Edit</Link>}
        </div>
        <div className="flex flex-col gap-2">
            <Separator />
            <Reactions blog={blog} />
            <Separator />
        </div>
        <h2 className="text-4xl font-bold">{blog.title}</h2>
        {!!blog.tags.length && <div className="flex items-center gap-4 flex-wrap">
            {blog.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>}
        <div>
            <BlockNoteEditor editable={false} initialContent={blog.content} />
        </div>
        <Separator />
        {/* <Comments blog={blog} /> */}
        <Comments blog={blog} />
    </div>);
}

export default BlogContent;