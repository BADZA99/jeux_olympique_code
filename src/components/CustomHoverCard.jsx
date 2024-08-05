/* eslint-disable react/prop-types */
import CountUp from 'react-countup';
import '../App.css'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEffect } from 'react';
import gsap from 'gsap';

export default function CustomHoverCard({ triggerText, countries }) {

    useEffect(()=>{
    gsap.from(".statModal", {
      y: 10,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "power3.inOut",
    });

    gsap.to(".statModal", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.inOut",
        });
        }, []);
  return (
    <HoverCard>
      <HoverCardTrigger>
        <CountUp end={triggerText} duration={2.75} />
      </HoverCardTrigger>
      <HoverCardContent className="statModal z-[51]">
        <ul className="text-black text-sm space-y-2">
          {countries?.map((country, index) => (
            <li key={index} className="flex items-center space-x-2 ">
              <span className="font-bold text-blue-600">{index + 1}.</span>
              <span className="font-medium">{country.name}:</span>
              <span className="text-gray-700">
                {country.totalMedals} medals
              </span>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
