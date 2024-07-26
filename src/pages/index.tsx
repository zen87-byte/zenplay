import React from "react";
import Card from "../components/Card";
import Layout from "../components/Layout/Layout";
import { fetchCategory } from "../utils/fetch";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Hero from "../components/Hero/Hero";

export default function Home({
  playingData,
  popularData,
  topRatedData,
  upcomingData,
}) {
  const { data: session } = useSession();
  return (
    <>
      {/* {session ? ( */}
      <Layout>
        <Hero data={playingData}></Hero>
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 my-4">
          <div>
            <div className="my-2 px-8 flex justify-between">
              <h1 className="font-semibold">Popular</h1>
              <p className="text-xs">
                <Link href="movie/popular/all?page=1">See All &gt;</Link>
              </p>
            </div>
            <Card data={popularData} category="popular" />
          </div>
          <div>
            <div className="my-2 px-8 flex justify-between">
              <h1 className="font-semibold">Top Rated</h1>
              <p className="text-xs">
                <Link href="movie/top_rated/all?page=1">See All &gt;</Link>
              </p>
            </div>
            <Card data={topRatedData} category="top-rated" />
          </div>
          <div>
            <div className="my-2 px-8 flex justify-between">
              <h1 className="font-semibold">Coming Soon</h1>
              <p className="text-xs">
                <Link href="movie/upcoming/all?page=1">See All &gt;</Link>
              </p>
            </div>
            <Card data={upcomingData} category="coming-soon" />
          </div>
        </div>
      </Layout>
      {/* ) : (
        <div>logout</div>
      )} */}
    </>
  );
}

export async function getServerSideProps() {
  const playingData = await fetchCategory("movie/now_playing");
  const popularData = await fetchCategory("movie/popular");
  const topRatedData = await fetchCategory("movie/top_rated");
  const upcomingData = await fetchCategory("movie/upcoming");
  return { props: { playingData, popularData, topRatedData, upcomingData } };
}
