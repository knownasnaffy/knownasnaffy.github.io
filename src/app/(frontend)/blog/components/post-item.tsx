'use client'

import { Media, Post } from '@/payload-types'
import { useRouter } from '@bprogress/next'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function PostItem({ item }: { item: Post }) {
  const router = useRouter()
  const goToPost = (id: string) => {
    return () => {
      router.push(`/blog/${id}`)
    }
  }

  return (
    <section key={item.id} id={item.slug} className="flex flex-col">
      <Image
        src={(item.coverImage as Media).url || '/neovim-remote.svg'}
        alt="Neovim Remote"
        width={1280}
        height={720}
        className="w-full h-auto border rounded-md mt-10 mb-0 hover:cursor-pointer hover:opacity-75 transition-opacity duration-200"
        onClick={goToPost(item.slug)}
      />
      <h2
        className="hover:cursor-pointer hover:opacity-75 transition-opacity duration-200"
        onClick={goToPost(item.slug)}
      >
        {item.title}
      </h2>
      <p>{item.description}</p>
      <Link
        href={`/blog/${item.slug}`}
        className="inline-flex items-center no-underline hover:opacity-75 transition-opacity duration-200"
      >
        Read More <ArrowRight className="inline ml-2 size-4" />
      </Link>
    </section>
  )
}
