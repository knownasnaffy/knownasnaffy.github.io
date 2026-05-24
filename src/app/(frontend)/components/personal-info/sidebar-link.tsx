import Link from 'next/link'

const SidebarLink = ({
  href,
  newTab,
  children,
}: {
  href: string
  newTab: boolean
  children: React.ReactNode
}) => {
  const linkStyle =
    'text-sm focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-[3px] ring-offset-2 ring-offset-background rounded-xs text-[#D1D5DC] hover:text-white transition-all hover:underline underline-offset-2 inline-flex items-center gap-2'

  return (
    <li className="pl-0">
      {newTab ? (
        <a href={href} target={'_blank'} rel={'noopener'} className={linkStyle}>
          {children}
        </a>
      ) : (
        <Link href={href} className={linkStyle}>
          {children}
        </Link>
      )}
    </li>
  )
}

export default SidebarLink
