import { HeroVideoDialog } from "@/components/animated/hero-video-dialog";
import DotPattern from "@/components/dot-pattern-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const words = ["React Hook Form", "Formik", "TanStack Form"];

const HomePage = () => {
  return (
    <div>
      <section className="container flex flex-col py-8">
        <div className="relative text-center h-[25rem] flex flex-col justify-center items-center gap-8">
          <h1 className="max-w-4xl">
            Build React Forms Effortlessly with Your Preferred Library
          </h1>

          <p className="max-w-3xl">
            A powerful tool to create form components in React Hook Form,
            Formik, or TanStack Form, using shadcn/ui. Copy-paste ready code for
            faster form creation.
          </p>

          <div className="flex items-center gap-4">
            <Button rounded="full" size="lg" asChild>
              <Link href="/react-hook-form/playground">Start Building</Link>
            </Button>

            <Button variant="outline" rounded="full" size="lg">
              Learn More
            </Button>
          </div>

          <DotPattern className="-z-10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
        </div>

        <HeroVideoDialog
          // className="dark:hidden block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/eOgYszuG5Ac?si=igk0aqpSMffqq8sa"
          thumbnailSrc="/assets/landing.png"
          thumbnailAlt="Hero Video"
        />
      </section>
    </div>
  );
};

export default HomePage;
