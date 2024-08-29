import mikuData from "../worldwide-miku.json";
import { Masonry as Masonic } from "masonic";

interface ImageListProps {
  country?: string;
}

interface ImageProps {
  data: {
    id: number;
  };
}

const Image = ({ data: { id } }: ImageProps) => {
  return <img loading="lazy" src={`/mikus/${id}.jpg`} />;
};

export default function ImageList({ country }: ImageListProps) {
  let data = mikuData;

  if (country) {
    data = mikuData.filter((miku) =>
      miku.tags.find((tag) => tag === `country:${country}`)
    );
  }

  return (
    <div className="p-4">
      <Masonic
        key={country}
        rowGutter={10}
        columnGutter={10}
        maxColumnCount={3}
        items={data}
        render={Image}
      />
    </div>
  );
}
