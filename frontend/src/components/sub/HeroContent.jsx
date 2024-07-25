import { Plane, StarsCanvas, LionAir, Citilink } from "../canvas";
import { SparklesIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { styles } from '../../style'
import { data } from '../../constants';
import { useEffect } from "react";

const fetchData = async () => {
  try {
    const response = await fetch('http://10.110.180.25/VirtualRadar/AircraftList.json?ldv=638569561247171075&stm=1721362383529&lat=-6.8961484062892975&lng=107.57571995302902&selAc=9045370&trFmt=fa');
    
    if (!response.ok) {
      throw new Error('Data tidak tersedia');
    }
    
    const data = await response.json();

    console.log(data);
    
    // if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].acList)) {
    //   const acList = data[0].acList;

    //   const selectedPlaneId = 9045140;
    //   const selectedPlane = acList.find(plane => plane.Id === selectedPlaneId);
    //   console.log(selectedPlane);
    // } else {
    //   throw new Error('Format data tidak sesuai atau acList tidak ditemukan');
    // }
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    return [];
  }
}

const HeroContent = ({ selectedPlaneId, setSelectedPlaneId }) => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //     // fetchData().then(fetchedData => setData(fetchedData));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);  

  const handleSelectPlane = (id) => {
    setSelectedPlaneId(id);
  };

  const selectedPlane = data.find(plane => plane.Id === selectedPlaneId);

  const renderPlaneImage = () => {
    if (!selectedPlane) {
      return <Plane />;
    }

    switch (selectedPlane.Op) {
      case 'Lion Air':
        return <LionAir />;
      case 'Citilink':
        return <Citilink />;
      default:
        return <Plane />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`${styles.paddingX} flex flex-row items-center justify-center w-full mt-32 z-[20]`}
    >
      <StarsCanvas />
      <div className="h-[80vh] w-full flex flex-col gap-6 justify-center m-auto text-start">
        <div className="welcome-box py-[10px] px-[12px] border border-[#7042f88b] opacity-[0.9]">
          <SparklesIcon className="text-[#b49bff] mr-[50px] h-8 w-8" />
          <h1 className="welcome-text text-[24px] sm:text-[24px] flex">
            <span className="hidden sm:block">{selectedPlane?.Op ?? 'Undefined'} {selectedPlane?.Reg ?? 'Undefined'} - &nbsp;</span> 
          </h1>
          <h1 className="bg-blue-950 px-8 rounded-xl">{selectedPlane?.Icao ?? 'Undefined'}</h1>
        </div>
        {renderPlaneImage()}
      </div>

      <div className="w-full h-full hidden sm:flex justify-center items-center">
        <div className='flex-[0.75] p-8 bg-black-100 rounded-2xl'>
          <p className={styles.sectionSubText}>ADS-B Flight and Test Center </p>
          <h3 className={styles.sectionHeadText}>List Plane.</h3>
          <div className="plane-list h-[60vh] overflow-y-scroll">
            {data.map((plane) => (
              <div key={plane.Id} className="plane-item flex justify-between items-center my-2 p-2 border-b border-gray-600">
                <div className="plane-info">
                  <p>{`${plane.Op} ${plane.Reg} -`} <span className='bg-blue-950 px-6 rounded-xl'>{plane.Icao}</span></p>
                </div>
                <button
                  className="bg-[#2E236C] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
                  onClick={() => handleSelectPlane(plane.Id)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroContent
