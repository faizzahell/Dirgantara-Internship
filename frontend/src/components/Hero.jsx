import { blackHole } from "../assets"
import HeroContent from "./sub/HeroContent"
import DataPlane from "./sub/DataPlane"
import { useState } from "react";
import { data } from "../constants";
import CustomMap from "./sub/CustomMap";
import Controlling from "./sub/Controlling";

const Hero = () => {
  const [selectedPlaneId, setSelectedPlaneId] = useState(data[0].Id);
  const [showMap, setShowMap] = useState(false)

  return (
    <div className="relative flex flex-col w-full h-screen mx-auto">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-300px] sm:top-[-490px] left-0 z-[0] w-full h-full object-cover"
      >
        <source src={blackHole} type="video/webm"/>
      </video>

      <HeroContent selectedPlaneId={selectedPlaneId} setSelectedPlaneId={setSelectedPlaneId} />
      <DataPlane selectedPlaneId={selectedPlaneId} showMap={showMap} setShowMap={setShowMap}/>
      {showMap && (
        <div className="mt-0">
          <CustomMap selectedPlaneId={selectedPlaneId} />
        </div>
      )}
      <Controlling selectedPlaneId={selectedPlaneId} />
    </div>
  )
}

export default Hero