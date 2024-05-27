import { ChevronDown } from "lucide-react";

export function InfoSection() {
  return <section className="relative grid min-h-screen place-items-center lg:grid-cols-2 gap-8 container mx-auto snap-start snap-always">
    <div className="space-y-4 text-center lg:text-left max-lg:self-start max-lg:order-last">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Barinderpreet Singh
      </h1>
      <p className="text-xl text-white/75">
        I build web applications with a focus on user experience.
      </p>
    </div>
    <img
      src="/avatar.jpeg"
      alt="placeholder"
      className="w-2/3 md:w-2/5 lg:w-2/3 rounded-full max-lg:self-end" />
    <span className="absolute inset-x-1/2 bottom-0 text-xl text-white font-medium py-4 w-fit flex items-center gap-2 animate-bounce">
      Scroll <ChevronDown className="" />
    </span>
  </section>;
}
