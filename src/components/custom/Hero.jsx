import React from "react";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#17CF97]">Explore the World with Al:</span>{" "}
        <br />
        Tailored Routes Right at Your Fingertips!
      </h1>
      <p className="text-xl text-gray-500">
        Crafting unique itineraries that suit to your interests and budget, I
        will act as your personal travel planner and curator.
      </p>
      <Button>Get Started, It's Free</Button>
    </div>
  );
}

export default Hero;
