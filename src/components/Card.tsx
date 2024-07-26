import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Image from "next/image";

const Card = ({ data, category }) => {
  const res = data.results;
  return (
    <div className="group px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {res.map(
            (
              item: {
                id: number;
                poster_path: string;
                title: string;
                overview: string;
              },
              index: number
            ) => (
              <CarouselItem className="basis-1/3 sm:basis-1/6 lg:basis-1/12" key={index}>
                <Link
                  href={`/movie/${category}/${item.id}?title=${item.title}`}
                  passHref
                >
                  <div>
                    <Image
                      width={1000}
                      height={1000}
                      className="rounded-md w-32 z-40"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={`${item.title}`}
                    />
                  </div>
                </Link>
                
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="invisible group-hover:visible" />
        <CarouselNext className="invisible group-hover:visible" />
      </Carousel>
    </div>
  );
};

export default Card;
