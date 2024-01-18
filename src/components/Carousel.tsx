import { getDetails } from "../utils/getDetails";
import { FaPlus, FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaRegPlayCircle } from "react-icons/fa";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const AutoCarousel = ({ data }) => {
  const items = data.results;
  const details = getDetails(901362);
  // console.log("details", details);
  // console.log("Carousel:", items);

  const getIndex = (index) => {
    console.log(index);
  };

  return (
    <div className="w-full z-10">
      <div className="relative w-full">
        <div
          className="relative max-h-4/5 bg-cover bg-no-repeat bg-center flex"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
          }}
        >
          <div className="w-full pt-48 px-16 z-20">
            <div className="block w-2/5 left-0 top-0">
              <div className="text-5xl font-bold">{details.title}</div>
              {/* <div className="my-2 flex items-center gap-2">
                <FaStar fill="yellow" />
                <p>{details.rating}</p>
                <GoDotFill />
                <p>{details.release_date.slice(0, 4)}</p>
              </div>
              <div className="flex gap-4 my-2">
                {details.genres.map((item, index: number) => (
                  <button
                    key={index}
                    className="border border-white rounded-xl px-3 py-1 text-xs"
                  >
                    {item.name}
                  </button>
                ))}
              </div> */}
              <div className="my-4">{details.overview}</div>
              <div className="my-4 flex gap-4">
                <button className="flex items-center gap-2 px-4 py-1 bg-white text-black rounded-md">
                  <FaRegPlayCircle />
                  <p>Watch Now</p>
                </button>
                <button className="flex items-center gap-2 px-4 py-1 border border-white rounded-md">
                  <FaPlus />
                  <p>More Info</p>
                </button>
              </div>
            </div>
            <div className="w-full my-8">
              <div className="group w-full">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                >
                  <CarouselContent className="w-full ">
                    {/* mxauto */}
                    {items.map(
                      (
                        item: {
                          backdrop_path: string;
                          id: number;
                          poster_path: string;
                          title: string;
                          overview: string;
                        },
                        index: number
                      ) => (
                        <CarouselItem className="basis-1/6" key={index}>
                          <Link
                            href={`/movies/${item.id}?title=${item.title}`}
                            passHref
                          >
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <img
                                  className="rounded-md w-60 border border-white my-2"
                                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                                  alt={`${item.title}`}
                                />
                              </HoverCardTrigger>
                              <HoverCardContent className="max-w-72 z-50 p-2 bg-[#030712] border rounded-md">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="line-clamp-5 text-xs">
                                  {item.overview}
                                </p>
                              </HoverCardContent>
                            </HoverCard>
                          </Link>
                        </CarouselItem>
                      )
                    )}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="absolute z-10 w-1/3 w-full h-full left-0 bottom-0 bg-gradient-to-t from-[#030712] to-60%" />
          <div className="absolute z-10 w-1/3 w-full h-full left-0 bottom-0 bg-gradient-to-r from-[#030712]" />
        </div>
      </div>
    </div>
  );
};

export default AutoCarousel;
