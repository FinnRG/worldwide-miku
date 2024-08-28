import "./App.css";
import ImageCard from "./ImageCard";
import WorldMap2 from "./components/WorldMap2";
import "@fontsource-variable/rubik";

function App() {
  return (
    <div className="inset-0 absolute p-4 md:p-8">
      <h1 className="text-miku-dark font-bold text-4xl lg:text-6xl tracking-tight text-center">
        Miku Worldwide
      </h1>
      <h2 className="text-xl text-center text-muted-foreground">
        A collection of regional Vocaloid characters
      </h2>
      <WorldMap2 />
    </div>
  );
}

export default App;
