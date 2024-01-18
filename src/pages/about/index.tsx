import { Key, useState } from "react";
import { fetchData } from "../../utils/fetch";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";
import Layout from "../../components/Layout/Layout";

const Carousel = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const res = data.results;
  console.log(res);
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === res.length - 8 ? 0 : prevSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? res.length - 8 : prevSlide - 1
    );
  };

  return (
    <Layout>

    <div className="carousel flex">
      <button onClick={handlePrevSlide}>&lt;</button>
      <div className="poster-container w-full flex justify-between gap-4">
        {res.slice(currentSlide, currentSlide + 8).map(
          (
            item: {
              id: number;
              poster_path: string;
              title: string;
              overview: string;
            },
            index: number
          ) => (
            <div key={index}>
              <Link href={`/video/${item.id}`}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <img
                      className="rounded-md"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={`${item.title}`}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-60">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="line-clamp-5 text-xs">{item.overview}</p>
                  </HoverCardContent>
                </HoverCard>
              </Link>
            </div>
          )
        )}
      </div>
      <button onClick={handleNextSlide}>&gt;</button>
    </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  const data = await fetchData("movie/popular");
  return { props: { data } };
}
export default Carousel;
