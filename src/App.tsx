import { useState } from "react";
import "./App.css";
import WorldMap2 from "./components/WorldMap2";
import "@fontsource-variable/rubik";
import mikuData from "./worldwide-miku.json";
import { Masonry } from "react-plock";

// https://forms.gle/N9eWx9LieYYi32De9

function App() {
  const [country, setCountry] = useState<string | undefined>(undefined);
  return (
    <div className="inset-0 absolute p-4 md:p-8">
      <h1 className="text-miku-dark font-bold text-4xl lg:text-6xl tracking-tight text-center">
        Miku Worldwide
      </h1>
      <h2 className="text-xl text-center text-muted-foreground">
        A collection of regional Vocaloid characters
      </h2>
      <WorldMap2 onClick={(country) => setCountry(country)} />
      <Masonry
        items={mikuData}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 6],
          media: [640, 768, 1024],
        }}
        render={(item, idx) => <img key={idx} src={`/mikus/${item.id}.jpg`} />}
      />
    </div>
  );
}

export default App;
