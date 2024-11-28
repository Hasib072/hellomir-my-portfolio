
"use client";
import { useEffect } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default function Home() {

  useEffect(() =>{
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      // eslint-disable-next-line no-unused-vars
      new LocomotiveScroll();
      
    })();
  })

  useEffect(() => {
    // Register the plugin
    gsap.registerPlugin(ScrollTrigger);

    // Your GSAP animation code here
    gsap.to('.box', {
      scrollTrigger: {
        trigger: '.box',
        start: 'top center',
        end: 'bottom 100px',
        scrub: true,
        markers: true, // Remove this in production
      },
      x: 500,
      rotation: 360,
      duration: 3,
    });
  }, []);

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
    
    <div>
      <div style={{ height: '100vh' }}>
        <h1>Scroll down to see the animation!</h1>
      </div>
      <div className="box" style={{ width: 100, height: 100, background: 'red' }}></div>
      <div style={{ height: '100vh' }}></div>
    </div>

    <div className="testdiv"></div>
    <div className="testdiv"></div>
    </>
  );
}
