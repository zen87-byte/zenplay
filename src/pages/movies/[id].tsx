import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import VideoThumbnail from "../../components/Video";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaStar, FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
// import { getReviews } from "../../utils/getReviews";
import Comment from "../../components/Comment/Comment";
import { getIdFromUrl } from "../../utils/getId";
import { detailsType, getDetails } from "../../utils/getDetails";
const MoviePage = () => {
  // const router = useRouter();
  // const { id, title } = router.query;
  // console.log("id: ", id, "title: ", title);
  // const [imgSrc, setImgSrc] = useState<string>("");
  // let imageData: string = "";
  // const getImage = async () => {
  //   try {
  //     imageData = await getImages();
  //     setImgSrc(imageData);
  //   } catch (error) {
  //     console.error("Error fetching image data:", error);
  //   }
  // };
  // getImage();
  const id: number = getIdFromUrl();
  console.log("id: ", id);
  const details = getDetails(id);
  console.log(details);
  if (!details.backdrop_path) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="w-full">
        <div
          className="relative max-h-screen bg-cover bg-no-repeat bg-center flex"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
          }}
        >
          <div className="w-full flex items-center py-48 px-16 z-20">
            <div className="block w-3/5 left-0 top-0">
              <div className="text-5xl font-bold">{details.title}</div>
              <div className="my-2 flex items-center gap-2">
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
              </div>
              <div>{details.overview}</div>
              <div className="my-4 flex gap-4">
                <button className="flex items-center gap-2 px-4 py-1 bg-white text-black rounded-md">
                  <FaRegPlayCircle />
                  <p>Play Now</p>
                </button>
                <button className="flex items-center gap-2 px-4 py-1 border border-white rounded-md">
                  <FaPlus />
                  <p>Watchlist</p>
                </button>
              </div>
            </div>
            <div className="w-full right-0">
              <div className="outline p-2">
                <div className="outline">
                  <img
                    className="rounded-xl outline w-60 float-right"
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={`${details.poster_path}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute z-10 w-1/3 w-full h-full left-0 bottom-0 bg-gradient-to-t from-[#030712] to-60%" />
          <div className="absolute z-10 w-1/3 w-full h-full left-0 bottom-0 bg-gradient-to-r from-[#030712]" />
        </div>
        <div>
          <Comment id={id} />
        </div>
      </div>
    </Layout>
  );
};

export default MoviePage;
