const SidebarSection = ({ title, items }: { title: string; items: React.ReactNode }) => {
  return (
    <section aria-labelledby={`${title}-heading`} className="space-y-2 prose-sm">
      <h2 id={`${title}-heading`} className="font-bold ">
        {title}
      </h2>
      <ul className="mt-1 space-y-0 list-none pl-0">{items}</ul>
    </section>
  )
}

export default SidebarSection
