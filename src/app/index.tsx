import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Calendar, Star,ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <div className="relative bg-gradient-to-br from-[#4A25EB] to-[#25C6EB] via-primary text-white h-screen overflow-auto snap-y snap-mandatory overscroll-y-none">
        <section className="grid min-h-screen place-items-center lg:grid-cols-2 gap-8 container mx-auto snap-start snap-always">
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
            className="w-2/3 md:w-2/5 lg:w-2/3 rounded-full max-lg:self-end"
          />
        </section>
        <span className="absolute inset-x-1/2 bottom-0 text-xl text-white font-medium py-4 w-fit flex items-center gap-2 animate-bounce">
          Scroll <ChevronDown className="" />
        </span>
        <section className="h-screen container mx-auto flex flex-col justify-center gap-8 snap-start snap-always">
          <div className="flex justify-between items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Projects
            </h1>
            <Button className="gap-1" variant="ghost">
              View More<ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-8">
            {/* IDEA: When the user hovers over the card, a popup bubble will appear on the progressbar aligned to the bottom and animating in from the left */}
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </section>
      </div>
    </>
  );
}

function ProjectCard() {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle className="tracking-tight font-bold">
            Project Title
          </CardTitle>
          <CardDescription>
            A lengthy description of a small project.
          </CardDescription>
          <CardDescription className="inline-flex items-center">
            <Calendar className="w-4 h-4 mr-1" /> Started 11 May 2022{" "}
            <Star className="w-4 h-4 mr-1 ml-2" /> 1 Star
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge>Typescript</Badge>
          <Badge>Tailwind</Badge>
          <Badge>Shadcn</Badge>
          <Badge>Whatever</Badge>
        </CardFooter>
        <Progress value={75} className="rounded-t-none h-2" />
      </Card>
    </>
  );
}
