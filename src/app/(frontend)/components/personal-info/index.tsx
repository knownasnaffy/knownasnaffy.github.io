import { GithubIcon, LinkedInIcon } from '@/lib/social-icons'
import { MailIcon, MapPin, Palette } from 'lucide-react'
import SidebarSection from './sidebar-section'
import SidebarLink from './sidebar-link'
import HomeNBlogLink from './home-n-blog-link'

export default function PersonalInfo() {
  return (
    <aside
      className="border-r px-6 sm:px-8 lg:px-12 xl:px-8 py-8 md:sticky md:top-0 md:h-screen space-y-9 overflow-auto"
      aria-label="Personal Info"
    >
      <section aria-labelledby="profile-heading">
        <h1 id="profile-heading" className="text-2xl font-bold">
          Barinderpreet Singh
        </h1>
        <p className="text-sm text-[#D1D5DC]">Full-stack Developer</p>
      </section>

      <SidebarSection
        title="Contact"
        items={
          <>
            <SidebarLink href="https://en.wikipedia.org/wiki/Patiala" newTab={true}>
              <MapPin className="size-4" />
              <span className="sr-only">Location: </span>
              Patiala, Punjab, India
            </SidebarLink>
            <SidebarLink href="mailto:naffydharni006@gmail.com" newTab={true}>
              <MailIcon className="size-4" />
              <span className="sr-only">Email: </span>
              naffydharni006@gmail.com
            </SidebarLink>
          </>
        }
      />

      <SidebarSection
        title="Social"
        items={
          <>
            <SidebarLink href="https://linkedin.com/in/knownasnaffy" newTab={true}>
              {LinkedInIcon}
              LinkedIn
            </SidebarLink>
            <SidebarLink href="https://github.com/knownasnaffy" newTab={true}>
              {GithubIcon}
              GitHub
            </SidebarLink>
          </>
        }
      />

      <SidebarSection
        title="Quick Links"
        items={
          <>
            <HomeNBlogLink />
            <SidebarLink href="/fancy" newTab={false}>
              <Palette className="size-4" />
              Prefer colors?
            </SidebarLink>
          </>
        }
      />
    </aside>
  )
}
