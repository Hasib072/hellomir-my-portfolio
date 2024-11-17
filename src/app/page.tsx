
"use client";
import Image from "next/image";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useEffect } from "react";


export default function Home() {

  useEffect(() =>{
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  })

  return (
    <>

    <div data-scroll-section>
    <div className="bg-pink-600 w-full h-screen items-center p-20">

    <div className="paralax_container m-[35vh] flex items-center justify-center">
    <div
  data-scroll
  data-scroll-speed="2"
  className="internal-image h-[250px] w-[150px] bg-black mr-2"
></div>
<div
  data-scroll
  data-scroll-speed="0.3"
  className="internal-image h-[250px] w-[150px] bg-gray-500"
></div>

    </div>

    </div>
    </div>
    
    <div className="testdiv"></div>
    <div className="testdiv"></div>
    <div className="testdiv"></div>
    </>
  );
}
