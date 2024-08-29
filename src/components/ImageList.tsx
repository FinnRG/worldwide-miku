import mikuData from "../worldwide-miku.json";
import { Masonry as Masonic } from "masonic";
import {
  ExclamationTriangleIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import iso from "iso-3166-1";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ImageListProps {
  country?: string;
}

interface ImageProps {
  data: {
    id: number;
    artistName: string;
    source: string;
    tags: string[];
  };
}

const tagsToCountries = (tags: string[]) =>
  tags
    .filter((tag) => tag.startsWith("country:"))
    .map((tag) => tag.split("country:")[1])
    .map((alpha3) => iso.whereAlpha3(alpha3)?.country)
    .filter((c) => c !== undefined)
    .join(", ");

const Image = ({ data: { id, artistName, source, tags } }: ImageProps) => {
  const [isActive, setIsActive] = useState(false);

  const countries = tagsToCountries(tags);

  return (
    <div className="group" onTouchStart={() => setIsActive(!isActive)}>
      <img loading="lazy" className="rounded-lg" src={`/mikus/${id}.jpg`} />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 opacity-0 ${
          isActive ? "opacity-100" : ""
        } group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-center items-center p-4`}
      >
        <h2 className="text-white text-center text-xl font-bold mb-2">
          {countries}
        </h2>
        <p className="text-white text-sm mb-2">
          Image by <span className="font-semibold">{artistName}</span>
        </p>
        <a
          href={source}
          target="_blank"
          className="flex flex-row items-center text-blue-400 underline text-sm"
        >
          Source
          <ExternalLinkIcon className="ml-2 size-4" />
        </a>
      </div>
    </div>
  );
};

export default function ImageList({ country }: ImageListProps) {
  let data = mikuData;

  if (country) {
    data = mikuData.filter((miku) =>
      miku.tags.find((tag) => tag === `country:${country}`)
    );
  }

  return (
    <div className="p-4 pb-16">
      {country && (
        <h2 className="text-center font-bold text-4xl mb-4">
          {iso.whereAlpha3(country)?.country}
        </h2>
      )}
      {data.length === 0 && (
        <div className="flex flex-col items-center">
          <Alert
            variant="destructive"
            className="w-full md:w-[60vw] lg:w-[40vw] bg-white"
          >
            <ExclamationTriangleIcon className="size-4" />
            <AlertTitle>No results</AlertTitle>
            <AlertDescription>
              We currently do not know any Mikus for this region. You can
              suggest new pictures in our{" "}
              <a
                className="underline"
                target="_blank"
                referrerPolicy="no-referrer"
                href="https://forms.gle/Mx9QLVav3Ldc4fNe7"
              >
                online form
              </a>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Masonic
        key={country}
        rowGutter={10}
        columnGutter={10}
        maxColumnCount={3}
        items={data}
        render={(props) => <Image {...props} />}
      />
    </div>
  );
}
