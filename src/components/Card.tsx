import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const Card = ({ data }) => {
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
              <CarouselItem className="basis-1/8" key={index}>
                <Link href={`/movies/${item.id}?title=${item.title}`} passHref>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <img
                        className="rounded-md w-32 z-40"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={`${item.title}`}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="max-w-72 z-30 p-2 bg-[#030712] border rounded-md">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="line-clamp-5 text-xs">{item.overview}</p>
                    </HoverCardContent>
                  </HoverCard>
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
