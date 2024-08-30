import { useState } from "react";
import "./App.css";
import WorldMap2 from "./components/WorldMap2";
import "@fontsource-variable/rubik";
import TitleSection from "./components/TitleSections";
import ImageList from "./components/ImageList";

// https://forms.gle/N9eWx9LieYYi32De9

function App() {
  const [country, setCountry] = useState<string | undefined>(undefined);
  return (
    <div className="dark:bg-black min-h-[100vh]">
      <TitleSection />
      <WorldMap2 onClick={(country) => setCountry(country)} />
      <ImageList country={country} />
    </div>
  );
}

export default App;
