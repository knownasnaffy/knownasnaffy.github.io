// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media, Post } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { format, parseISO } from 'date-fns'
import { Calendar } from 'lucide-react'
import TOC from '../../components/dynamic-toc'
import { jsxConverter } from '@/lib/converters/jsx-converter'

async function getPostBySlug(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const post = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return post.docs[0]
}

async function getLatestPosts(slug: string): Promise<Post[]> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const blogPosts = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    depth: 1,
    limit: 2,
    where: {
      slug: {
        not_equals: slug,
      },
    },
  })
  return blogPosts.docs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>
}): Promise<Metadata> {
  const post = await getPostBySlug((await params).post)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ post: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const post = await getPostBySlug((await params).post)

  if (!post) {
    notFound()
  }

  const latestPosts = await getLatestPosts(post.slug)

  return (
    <>
      <div
        id="main"
        className="px-6 sm:px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-0 prose-h1:border-b prose-h1:pb-4 max-w-2xl md:mx-auto prose-h2:mb-3 prose-h2:mt-9 prose-h2:scroll-m-9 w-full prose-pre:overflow-auto prose-pre:max-w-full prose-pre:text-wrap prose-pre:break-words"
      >
        <Image
          src={(post.coverImage as Media).url || ''}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full h-auto border rounded-md mt-0 mb-6"
        />
        <h1 className="max-sm:text-2xl">{post.title}</h1>
        <p className="inline-flex items-center mb-0">
          <Calendar className="size-4 mr-2 -mt-1" />
          Created at: {format(parseISO(post.createdAt), 'MMMM d, yyyy')}
        </p>
        <RichText converters={jsxConverter} data={post.content} />
        <h2 className="pt-10">Latest Posts</h2>
        <div className="pt-2 flex flex-col gap-4 md:gap-2">
          {latestPosts.length ? (
            latestPosts.map((post) => (
              <div key={post.slug} className="flex gap-4">
                <Image
                  src={(post.coverImage as Media).url || ''}
                  alt={post.title}
                  height={720}
                  width={1280}
                  className="h-24 mt-0 mb-0 w-auto border rounded-sm"
                />
                <div className="flex flex-col ">
                  <h3 className="mt-2">{post.title}</h3>
                  <p className="overflow-hidden hidden lg:block max-w-[400px] text-ellipsis whitespace-nowrap w-full">
                    {post.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground">Nothing here yet (◡︵◡)</div>
          )}
        </div>
      </div>
      <TOC />
    </>
  )
}
