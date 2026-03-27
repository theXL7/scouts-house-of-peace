const footerLinks = [
  { label: "About", href: "#house-of-peace" },
  { label: "Programs", href: "#activities" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#join-us" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[linear-gradient(180deg,#DDD0C1_0%,#ECE2D5_26%,#F4ECE1_100%)] px-6 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10"
    >
      <div className="mx-auto max-w-6xl border-t border-[#123B6D]/8 pt-7 sm:pt-8">
        <div className="flex flex-col gap-6 text-center sm:gap-7 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#123B6D]/66">
              Scouts of the House of Peace
            </p>
            <p className="mt-3 text-[0.98rem] leading-7 text-[#2A2A2A]/58">
              Building a culture of peace through scouting, community, and
              shared belonging.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#2A2A2A]/62 lg:justify-end">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-[#123B6D]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-[#123B6D]/7 pt-5 text-center text-[0.82rem] text-[#2A2A2A]/48 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>Rooted in community service and open to wider connection.</p>
          <p>English site foundation for Scouts Maison de La Paix.</p>
        </div>
      </div>
    </footer>
  );
}
