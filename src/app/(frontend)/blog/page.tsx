import config from '@/payload.config'
import { getPayload } from 'payload'
import PostItem from './components/post-item'
import TOC from '../components/dynamic-toc'
import { getSiteUrl } from '@/lib/utils'

const siteUrl = getSiteUrl()

export const metadata = {
  title: 'Blog · Barinderpreet Singh',
  description: 'Technical articles and notes.',
  openGraph: {
    title: 'Blog · Barinderpreet Singh',
    description: 'Read professional blog posts.',
    url: `${siteUrl}/blog`,
    images: [{ url: `${siteUrl}/og-image-blog.png` }],
  },
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const blogPosts = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    depth: 1,
    limit: 8,
  })

  return (
    <>
      <div
        id="main"
        className="px-6 sm:px-8 py-8 prose prose-sm dark:prose-invert prose-h1:mb-0 prose-h1:border-b prose-h1:pb-4 max-w-2xl md:mx-auto prose-h2:mb-3 prose-h2:mt-6 prose-h2:scroll-m-9 w-full"
      >
        <h1 className="">Blog</h1>
        {blogPosts.docs.map((item) => (
          <PostItem item={item} key={item.id} />
        ))}
      </div>
      <TOC blogPage />
    </>
  )
}
