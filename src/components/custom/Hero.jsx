import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center md:mx-16 lg:mx-56 gap-9">
      <h2 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#3F704D]">
          Plan Your Perfect Getaway with AI:
        </span>{" "}
        <br />
        Intelligent Itineraries, Effortless Organization, and Unmatched
        Convenience
      </h2>
      <p className="text-center">
        Let our AI craft the perfect itinerary for your next adventure. From
        personalized plans to seamless travel, we make your journey effortless
        and memorable
      </p>
      <Link to={"create-trip"}>
        <Button variant="destructive">Get Started With Us</Button>
      </Link>
    </div>
  );
};

export default Hero;
