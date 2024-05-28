import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ProjectsSection() {
  return (
    <section className="min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always">
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Projects
        </h1>
        <a href="https://github.com/knownasnaffy?tab=repositories" target="_blank" rel="noopener noreferrer">
          <Button className="gap-1" variant="ghost">
            View More
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </a>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-8">
        {/* IDEA: When the user hovers over the card, a popup bubble will appear on the progressbar aligned to the bottom and animating in from the left */}
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
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
          <CardDescription className="inline-flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Started 11 May 2022
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="w-4 h-4" /> 1 Star
            </span>
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
