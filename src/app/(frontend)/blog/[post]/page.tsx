// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { format, parseISO } from 'date-fns'
import { Calendar } from 'lucide-react'
import TOC from '../../components/dynamic-toc'

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

  return (
    <>
      <div
        id="main"
        className="px-6 sm:px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-0 prose-h1:border-b prose-h1:pb-4 max-w-2xl md:mx-auto prose-h2:mb-3 prose-h2:mt-6 prose-h2:scroll-m-9 w-full"
      >
        <Image
          src={(post.coverImage as Media).url || ''}
          alt="Neovim Remote"
          width={1280}
          height={720}
          className="w-full h-auto border rounded-md mt-0 mb-6"
        />
        <h1 className="">{post.title}</h1>
        <p className="inline-flex items-center mb-0">
          <Calendar className="size-4 mr-2 -mt-1" />
          Created at: {format(parseISO(post.createdAt), 'MMMM d, yyyy')}
        </p>
        <RichText data={post.content} />
        <div className="h-screen" />
      </div>
      <TOC />
    </>
  )
}
