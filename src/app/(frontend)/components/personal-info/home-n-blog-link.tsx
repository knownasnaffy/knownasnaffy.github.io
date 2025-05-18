'use client'

import { House, Rss } from 'lucide-react'
import SidebarLink from './sidebar-link'
import { usePathname } from 'next/navigation'

export default function HomeNBlogLink() {
  const pathname = usePathname()
  if (pathname.startsWith('/blog'))
    return (
      <SidebarLink href="/" newTab={false}>
        <House className="size-4" />
        Home
      </SidebarLink>
    )
  else
    return (
      <SidebarLink href="/blog" newTab={false}>
        <Rss className="size-4" />
        Blog posts
      </SidebarLink>
    )
}
