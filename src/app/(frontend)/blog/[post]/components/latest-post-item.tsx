'use client'

import { Media, Post } from '@/payload-types'
import { useRouter } from '@bprogress/next'
import Image from 'next/image'

export default function LatestPostItem({ post }: { post: Post }) {
  const router = useRouter()
  return (
    <div key={post.slug} className="flex gap-4">
      <Image
        src={(post.coverImage as Media).url || ''}
        alt={post.title}
        height={720}
        width={1280}
        className="h-24 mt-0 mb-0 w-auto border rounded-sm hover:opacity-75 hover:cursor-pointer"
        onClick={() => router.push('/blog/' + post.slug)}
      />
      <div className="flex flex-col ">
        <h3
          className="mt-2 hover:opacity-75 hover:cursor-pointer"
          onClick={() => router.push('/blog/' + post.slug)}
        >
          {post.title}
        </h3>
        <p className="overflow-hidden hidden lg:block max-w-[400px] text-ellipsis whitespace-nowrap w-full">
          {post.description}
        </p>
      </div>
    </div>
  )
}
