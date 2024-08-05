import CustomHoverCard from '@/components/CustomHoverCard';
import '../App.css'
import useSWR from "swr";
import { fetcher } from '@/utils/fetcher';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { gsap } from "gsap";
import { ClipLoader } from 'react-spinners';

export default function Home() {
  const [medalsByContinent, setMedalsByContinent] = useState({});
  const [topCountriesByContinent, setTopCountriesByContinent] = useState({});
  const [color, setColor] = useState("#111111");
  const { data, error, isLoading } = useSWR(
      "https://apis.codante.io/olympic-games/countries",
      fetcher
    );

    const filterMedalsByContinent = (data)=> {
      const continentMedals = {};

      data?.data.forEach((country) => {
        const { continent, gold_medals, silver_medals, bronze_medals } =
          country;

        if (!continentMedals[continent]) {
          continentMedals[continent] = {
            gold: 0,
            silver: 0,
            bronze: 0,
          };
        }

        continentMedals[continent].gold += gold_medals;
        continentMedals[continent].silver += silver_medals;
        continentMedals[continent].bronze += bronze_medals;
      });

      return continentMedals;
    };

    const getTopCountriesByContinent = (data) => {
        const continentCountries = {};

        data?.data.forEach((country) => {
          const { continent, gold_medals, silver_medals, bronze_medals } =
            country;
          const totalMedals = gold_medals + silver_medals + bronze_medals;

          if (!continentCountries[continent]) {
            continentCountries[continent] = [];
          }

          continentCountries[continent].push({ ...country, totalMedals });
        });

        const topCountries = {};

        Object.keys(continentCountries).forEach((continent) => {
          topCountries[continent] = continentCountries[continent]
            .sort((a, b) => b.totalMedals - a.totalMedals)
            .slice(0, 3);
        });

        return topCountries;
     };

    const ringRefs = useRef([]);

const handleMouseEnter = (index) => {
  if (ringRefs.current[index]) {
    ringRefs.current[index].classList.add("pulse-animation");
  }
};

const handleMouseLeave = (index) => {
  if (ringRefs.current[index]) {
    ringRefs.current[index].classList.remove("pulse-animation");
  }
};




   




  useEffect(() => {
    if (data) {
      const result = filterMedalsByContinent(data);
      setMedalsByContinent(result);
      const topCountries = getTopCountriesByContinent(data);
      setTopCountriesByContinent(topCountries);
    } else {
      setMedalsByContinent({});
      setTopCountriesByContinent({});
    }

    const rings = document.querySelectorAll(".ring");
    const headtext = document.querySelector(".headtext");
    const stats = document.querySelectorAll(".stats");
    const stats2 = document.querySelectorAll(".stats2");

    // Animation for rings
    gsap.from(rings, {
      scale: 0,
      duration: 1,
      stagger: 0.3,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(rings, {
      scale: 1,
      duration: 1,
      stagger: 0.3,
      ease: "back.inOut(1.2)",
      delay: 1, 
    });

    // Animation for headtext
    gsap.from(headtext, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 2.6, 
    });
    gsap.to(headtext, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      delay: 3.1, 
    });

    // Animation for stats
    gsap.from(stats, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.15,
      delay: 3.8, 
    });
    gsap.to(stats, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.15,
      delay: 4.3, 
    });

    // Animation for stats2
    gsap.from(stats2, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.15,
      delay: 4.8, // Adjust delay to start after stats animations
    });
    gsap.to(stats2, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.15,
      delay: 5.3, 
    });
  }, [data]);

    // console.log(data)
    // console.log(medalsByContinent);
    // console.log(topCountriesByContinent);
  return (
    <div className="containerR min-h-screen ">
      {isLoading && (
        <ClipLoader
          color={color}
          loading={isLoading}
          size={150}
          aria-label="Loading data"
          data-testid="loader"
        />
      )}
      {error && (
        <div className="text-center text-2xl font-bold mt-10">
          An error occurred
        </div>
      )}
      {!isLoading && !error && (
        <div className="flex flex-col justify-center items-center  w-[80%] mx-auto bgImage">
          <h1 className="text-3xl font-bold cursor-pointer text-center mt-10 headtext">
            Olympics medals per continent in PARIS 2024
          </h1>
          {/* stats */}
          <div className="flex justify-between mt-12 w-[60%] mx-auto stats z-50 ">
            {/* EUROPE */}
            <div className="text-center">
              <p
                className="text-blue-700 text-xl font-bold cursor-pointer"
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                Europe:{" "}
                <CustomHoverCard
                  triggerText={
                    medalsByContinent?.EUR?.gold +
                    medalsByContinent?.EUR?.silver +
                    medalsByContinent?.EUR?.bronze
                  }
                  countries={topCountriesByContinent?.EUR}
                />{" "}
              </p>
              <p>
                <span className="text-yellow-500">🥇</span>
                <CountUp end={medalsByContinent?.EUR?.gold} duration={2.75} />
                <span className="text-gray-500">🥈</span>{" "}
                <CountUp end={medalsByContinent?.EUR?.silver} duration={2.75} />{" "}
                <span className="text-yellow-900">🥉</span>{" "}
                <CountUp end={medalsByContinent?.EUR?.bronze} duration={2.75} />
              </p>
            </div>
            {/* AFRICA */}
            <div className="text-center">
              <p
                className="text-gray-700 text-xl font-bold cursor-pointer"
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseLeave(2)}
              >
                Africa:{" "}
                <CustomHoverCard
                  triggerText={
                    medalsByContinent?.AFR?.gold +
                    medalsByContinent?.AFR?.silver +
                    medalsByContinent?.AFR?.bronze
                  }
                  countries={topCountriesByContinent?.AFR}
                />
              </p>
              <p>
                <span className="text-yellow-500">🥇</span>{" "}
                <CountUp end={medalsByContinent?.AFR?.gold} duration={2.75} />{" "}
                <span className="text-gray-500">🥈</span>{" "}
                <CountUp end={medalsByContinent?.AFR?.silver} duration={2.75} />{" "}
                <span className="text-yellow-900">🥉</span>{" "}
                <CountUp end={medalsByContinent?.AFR?.bronze} duration={2.75} />{" "}
              </p>
            </div>
            {/* AMERICA */}
            <div className="text-center">
              <p
                className="text-red-700 text-xl font-bold cursor-pointer"
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={() => handleMouseLeave(4)}
              >
                America:{" "}
                <CustomHoverCard
                  triggerText={
                    medalsByContinent?.AME?.gold +
                    medalsByContinent?.AME?.silver +
                    medalsByContinent?.AME?.bronze
                  }
                  countries={topCountriesByContinent?.AME}
                />
              </p>
              <p>
                <span className="text-yellow-500">🥇</span>{" "}
                <CountUp end={medalsByContinent?.AME?.gold} duration={2.75} />{" "}
                <span className="text-gray-500">🥈</span>{" "}
                <CountUp end={medalsByContinent?.AME?.silver} duration={2.75} />{" "}
                <span className="text-yellow-900">🥉</span>{" "}
                <CountUp end={medalsByContinent?.AME?.bronze} duration={2.75} />{" "}
              </p>
            </div>
          </div>
          {/* rings div */}
          <div className="relative left-10 w-[80%] max-w-4xl aspect-square mt-10 mx-auto ">
            {/* Blue ring */}
            <div
              className="ring ring-0 absolute w-1/4 h-1/4 border-blue-600 rounded-full top-0 left-4 z-10"
              style={{
                borderWidth: `${
                  (medalsByContinent?.EUR?.gold +
                    medalsByContinent?.EUR?.silver +
                    medalsByContinent?.EUR?.bronze) /
                  7
                }px`,
              }}
              ref={(el) => (ringRefs.current[0] = el)}
            ></div>
            {/* Yellow ring */}
            {/* j'ai ajoute ring-0 pour enlever la bordure bleu par defaut et garder le style ring */}
            <div
              className="ring ring-0 absolute w-1/4 h-1/4 border-yellow-400 rounded-full top-12 left-14 z-20"
              style={{
                borderWidth: `${
                  (medalsByContinent?.ASI?.gold +
                    medalsByContinent?.ASI?.silver +
                    medalsByContinent?.ASI?.bronze) /
                  7
                }px`,
              }}
              ref={(el) => (ringRefs.current[1] = el)}
            ></div>
            {/* Black ring */}
            <div
              className="ring ring-0 absolute w-1/4 h-1/4 border-gray-950 rounded-full top-0 left-24 z-30"
              style={{
                borderWidth: `${
                  (medalsByContinent?.AFR?.gold +
                    medalsByContinent?.AFR?.silver +
                    medalsByContinent?.AFR?.bronze) /
                  3
                }px`,
              }}
              ref={(el) => (ringRefs.current[2] = el)}
            ></div>
            {/* Green ring */}
            <div
              className="ring ring-0 absolute w-1/4 h-1/4 border-green-500 rounded-full top-7 left-36 z-40"
              style={{
                borderWidth: `${
                  (medalsByContinent?.OCE?.gold +
                    medalsByContinent?.OCE?.silver +
                    medalsByContinent?.OCE?.bronze) /
                  7
                }px`,
              }}
              ref={(el) => (ringRefs.current[3] = el)}
            ></div>
            {/* Red ring */}
            <div
              className="ring ring-0 absolute w-1/4 h-1/4 border-red-600 rounded-full top-0 left-44 z-50"
              style={{
                borderWidth: `${
                  (medalsByContinent?.AME?.gold +
                    medalsByContinent?.AME?.silver +
                    medalsByContinent?.AME?.bronze) /
                  7
                }px`,
              }}
              ref={(el) => (ringRefs.current[4] = el)}
            ></div>
            {/* stats2 */}
            <div className="absolute top-[36%] right-[25%] left-[20%] flex justify-between w-[50%] stats2 z-50 ">
              {/* Asia */}
              <div className="text-center">
                <p
                  className="text-yellow-700 text-xl font-bold cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                >
                  Asia:{" "}
                  <CustomHoverCard
                    triggerText={
                      medalsByContinent?.ASI?.gold +
                      medalsByContinent?.ASI?.silver +
                      medalsByContinent?.ASI?.bronze
                    }
                    countries={topCountriesByContinent?.ASI}
                  />
                </p>
                <p>
                  <span className="text-yellow-500">🥇</span>{" "}
                  <CountUp end={medalsByContinent?.ASI?.gold} duration={2.75} />{" "}
                  <span className="text-gray-500">🥈</span>{" "}
                  <CountUp
                    end={medalsByContinent?.ASI?.silver}
                    duration={2.75}
                  />{" "}
                  <span className="text-yellow-900">🥉</span>{" "}
                  <CountUp
                    end={medalsByContinent?.ASI?.bronze}
                    duration={2.75}
                  />{" "}
                </p>
              </div>
              {/* Oceania */}
              <div className="text-center">
                <p
                  className="text-green-700 text-xl font-bold cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(3)}
                  onMouseLeave={() => handleMouseLeave(3)}
                >
                  Oceania:{" "}
                  <CustomHoverCard
                    triggerText={
                      medalsByContinent?.OCE?.gold +
                      medalsByContinent?.OCE?.silver +
                      medalsByContinent?.OCE?.bronze
                    }
                    countries={topCountriesByContinent?.OCE}
                  />
                </p>
                <p>
                  <span className="text-yellow-500">🥇</span>{" "}
                  <CountUp end={medalsByContinent?.OCE?.gold} duration={2.75} />{" "}
                  <span className="text-gray-500">🥈</span>{" "}
                  <CountUp
                    end={medalsByContinent?.OCE?.silver}
                    duration={2.75}
                  />{" "}
                  <span className="text-yellow-900">🥉</span>{" "}
                  <CountUp
                    end={medalsByContinent?.OCE?.bronze}
                    duration={2.75}
                  />{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


