import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
      <Link to="/create-trip" >
        <Button>Get Started, It's Free</Button>
      </Link>

      <img src="/landing.png" alt="landing_image"  className="-mt-20" />
    </div>
  );
}

export default Hero;
