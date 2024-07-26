import { detailsType } from "@utils/fetch";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import LoadingSuspense from "../Loading/Loading";
import Image from "next/image";
import Overview from "./Overview";
import { fetchDetails } from "@utils/fetch";
import Slide from "./Slide";
import Background from "./Background";

const Hero = ({ data }) => {
  const items = data.results;
  const [currentImg, setCurrentImg] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(items[0].id);
  const [details, setDetails] = useState<detailsType>();
  const [currentId, setCurrentId] = useState(0);
  const [changed, setChanged] = useState(0)
  const handleThumb = useCallback((index) =>{
    setCurrentId(index)
    setChanged(index)
    setCurrent(items[index].id)
    api.scrollTo(index)
    console.log("index: ", index)
    console.log("selected: ", index)
  }, [api])

  useEffect(() =>{

  }, [changed])
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      const currentId = api.selectedScrollSnap();
      setCurrentId(currentId);
      setCurrent(items[currentId].id);
    });
    api.on("reInit", () => api.scrollNext())
  }, [api, currentId]);

  useEffect(() => {
    const getDetails = async () => {
      const res = await fetchDetails(current);
      setDetails(res);
    };
    getDetails();
  }, [current]);

  if (!details || !data) {
    return <LoadingSuspense />;
  }
  console.log("current: ", currentImg);
  console.log("details", details);
  console.log("Carousel:", items);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="relative overflow-hidden">
          <div>
            <Background imageSrc={details.backdrop_path} />
          </div>
          <div className="w-full relative pt-48 px-4 md:px-8 lg:px-16">
            <div className="w-4/5 md:w-2/5">
              <Overview data={details} />
            </div>
            <div className="w-full my-8">
              <Slide
              event={handleThumb}
                items={items}
                currentId={currentId}
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
