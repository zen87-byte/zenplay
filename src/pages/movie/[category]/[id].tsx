import Layout from "@components/Layout/Layout";
import React from "react";
import LoadingSuspense from "@components/Loading/Loading";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaStar, FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import Comment from "@components/Comment/Comment";
import { getIdFromUrl } from "@utils/getId";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchDetails } from "@utils/fetch";
import Overview from "@components/Hero/Overview";
import Background from "@components/Hero/Background";

export default function MoviePage({ details, id }) {
  console.log(details);
  if (!details) {
    return <LoadingSuspense />;
  }
  // const { data: session } = useSession();
  return (
    <>
      {/* {session ? ( */}
      <Layout>
        <div className="w-full">
          <div className="relative w-full">
            <div>
              <Background imageSrc={details.backdrop_path} />
            </div>
            <div className="w-full flex items-center py-48 px-16">
              <div className="w-2/3">
                <Overview data={details} />
              </div>
              <div className="w-full">
                <div className=" px-16 mx-auto">
                  <div className="relative px-8">
                    <Image
                      className="rounded-xl border border-white w-60 float-right"
                      src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                      alt={`${details.poster_path}`}
                      width={500}
                      height={500}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Comment id={id} />
          </div>
        </div>
      </Layout>
      {/* ) : (
        ""
      )} */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
  const details = await fetchDetails(id);

  if (!details) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      details,
      id,
    },
  };
}
