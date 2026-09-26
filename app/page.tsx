import Image from "next/image";
import Hero from "./components/Hero";
import TechStackSection from "./components/TechStackSection";
import ExerciseLibrary from "./components/ExercizeLibrary";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ExerciseLibrary />
    </div>  
  );
}
