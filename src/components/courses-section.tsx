import { Building2, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function CoursesSection() {
  return (
    <section className="min-h-screen py-8 container mx-auto flex flex-col justify-center gap-8 md:snap-start md:snap-always">
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Courses
        </h1>
        <Dialog>
          <DialogTrigger>
            <Button className="gap-2" variant="ghost">
              Hire Me
              <Building2 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Oops!</DialogTitle>
              <DialogDescription>
                I'm not yet accepting any work from outsiders. But I can surely
                help you if you if we are close enough. For that, contact me on
                my personal number. You must have it, right?
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid md:grid-cols-3 place-items-center gap-8">
        <QualificationCard
          course="Secondary Education"
          org="Budha Dal Public School, Patiala - (CBSE)"
          duration="2020 - 2022"
          subjects="English, Maths, Science, Social Studies, Punjabi, Hindi, Information Technology"
          percentage={86.3}
        />
        <QualificationCard
          course="Senior Secondary Education"
          org="Budha Dal Public School, Patiala - (CBSE)"
          duration="2022 - 2024"
          subjects="English, Maths, Physics, Chemistry, Informatics Practice"
          percentage={61.2}
        />
        <QualificationCard
          course="B.Tech - Computer Science Engineering"
          org="Baba Banda Singh Bahadur Engineering College, Fatehgarh Sahib"
          duration="2024 - 2028"
          subjects="Maths, Physics, Applied Science"
          progress={0}
        />
      </div>
    </section>
  );
}

function QualificationCard({
  course,
  org,
  duration,
  subjects,
  cgpa,
  percentage,
  progress,
}: {
  course: string;
  org: string;
  duration: string;
  subjects: string;
  cgpa?: number;
  percentage?: number;
  progress?: number;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{course}</CardTitle>
        <CardDescription>{org}</CardDescription>
        <CardDescription className="inline-flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {duration}
        </CardDescription>
      </CardHeader>
      <CardFooter className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold">Subjects</h4>
          <p className="text-muted-foreground">{subjects}</p>
        </div>
        <div className="place-self-start">
          <h4 className="text-lg font-semibold">
            {percentage ? "Percentage" : cgpa ? "CGPA" : "Progress"}
          </h4>
          <p className="text-muted-foreground">
            {percentage ? percentage + "%" : cgpa ? cgpa : progress + "%"}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
