import { MailIcon, MapPin, Palette, Rss } from "lucide-react";
import { Link } from "react-router";
import { GithubIcon, LinkedInIcon } from "~/lib/social-icons";

export default function PersonalInfo() {
  return (
    <aside
      className="border-r px-8 lg:px-12 xl:px-8 py-8 md:sticky md:top-0 md:h-screen space-y-6"
      aria-label="Personal Info"
    >
      <section aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="text-2xl font-bold">
          Barinderpreet Singh
        </h2>
        <p className="text-sm text-[#D1D5DC]">Full-stack Developer</p>
      </section>

      <SidebarSection
        title="Contact"
        items={
          <>
            <SidebarLink
              href="https://en.wikipedia.org/wiki/Patiala"
              newTab={true}
            >
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
            <SidebarLink
              href="https://linkedin.com/in/knownasnaffy"
              newTab={true}
            >
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
            <SidebarLink href="/blog" newTab={false}>
              <Rss className="size-4" />
              Blog
            </SidebarLink>
            <SidebarLink href="/fancy" newTab={false}>
              <Palette className="size-4" />
              Prefer colors?
            </SidebarLink>
          </>
        }
      />
    </aside>
  );
}

const SidebarSection = ({
  title,
  items,
}: {
  title: string;
  items: React.ReactNode;
}) => {
  return (
    <section
      aria-labelledby={`${title}-heading`}
      className="space-y-2 prose-sm"
    >
      <h2 id={`${title}-heading`} className="font-bold ">
        {title}
      </h2>
      <ul className="mt-1 space-y-0 list-none pl-0">{items}</ul>
    </section>
  );
};

const SidebarLink = ({
  href,
  newTab,
  children,
}: {
  href: string;
  newTab: boolean;
  children: React.ReactNode;
}) => {
  const linkStyle =
    "text-sm focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-[3px] ring-offset-2 ring-offset-background rounded-xs text-[#D1D5DC] hover:text-white transition-all hover:underline underline-offset-2 inline-flex items-center gap-2";

  return (
    <li className="pl-0">
      {newTab ? (
        <a href={href} target={"_blank"} rel={"noopener"} className={linkStyle}>
          {children}
        </a>
      ) : (
        <Link to={href} className={linkStyle}>
          {children}
        </Link>
      )}
    </li>
  );
};
