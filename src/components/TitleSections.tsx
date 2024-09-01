import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Counter from "./Counter";
import mikuData from "../worldwide-miku.json";
import { DicesIcon } from "lucide-react";

const getRandomCountry = () => {
  const set = new Set(
    mikuData.flatMap((miku) =>
      miku.tags
        .filter((t) => t.startsWith("country:"))
        .map((t) => t.replace("country:", ""))
    )
  );

  return Array.from(set)[Math.floor(Math.random() * set.size)];
};

interface TitleSectionProps {
  setCountry?: (arg0: string) => unknown;
}

export default function TitleSection({ setCountry }: TitleSectionProps) {
  const numCountries = new Set(
    mikuData.flatMap((miku) =>
      miku.tags.filter((tag) => tag.startsWith("country:"))
    )
  ).size;

  const onRandomClick = () => {
    setCountry && setCountry(getRandomCountry());
    const imageList = document.getElementById("map-container");
    imageList?.scrollIntoView({
      inline: "end",
      behavior: "smooth",
    });
  };

  return (
    <div className="py-5">
      <div className="px-4 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-0  bg-clip-text bg-gradient-to-r text-transparent from-teal-400 via-blue-400 to-cyan-500">
          Miku Worldwide
        </h1>
        <p className="text-xl text-muted-foreground mb-4 md:mb-8">
          A collection of regional Vocaloid characters
        </p>
        <p className="text-lg dark:text-white text-foreground max-w-3xl mx-auto leading-relaxed">
          Click on the world map to filter the images, or browse through the
          image list below. This list is curated by hand, so any help in
          suggesting images is greatly appreciated. Anyone can suggest new
          images by clicking the button below.
        </p>
        <div className="my-4 md:my-8 flex justify-center gap-6 sm:gap-32">
          <Counter endNumber={mikuData.length} subtitle="Images" />
          <Counter endNumber={numCountries} subtitle="Countries" />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-14">
          <Button
            asChild
            size="lg"
            className="bg-white border text-teal-500 hover:bg-teal-50 font-semibold shadow-md rounded-lg transition-all"
          >
            <a
              referrerPolicy="no-referrer"
              href="https://forms.gle/Mx9QLVav3Ldc4fNe7"
              target="_blank"
            >
              Submit an image
              <ExternalLinkIcon className="ml-2 size-4" />
            </a>
          </Button>
          <Button
            onClick={onRandomClick}
            size="lg"
            className="bg-white border text-teal-500 hover:bg-teal-50 font-semibold shadow-md rounded-lg transition-all"
          >
            Random Country
            <DicesIcon className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
