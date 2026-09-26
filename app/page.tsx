import Image from "next/image";
import Hero from "./components/Hero";
import ExerciseLibrary from "./components/ExercizeLibrary";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ExerciseLibrary />
    </div>  
  );
}
