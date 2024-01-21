import React from "react";
import Card from "../components/Card";
import Layout from "../components/Layout/Layout";
import { fetchData } from "../utils/fetch";
import MainCarousel from "../components/Carousel";
import Link from "next/link";
import Carousel from "../components/Carousel";

const Home = ({ playingData, popularData, topRatedData, upcomingData }) => {
  return (
    <Layout>
      <Carousel data={playingData}></Carousel>
      <div className="px-12 my-4">
        <div>
          <div className="my-2 px-8 flex justify-between">
            <h1 className="font-semibold">Popular</h1>
            <p className="text-xs">
              <Link href="movies/popular">View All &gt;</Link>
            </p>
          </div>
          <Card data={popularData} />
        </div>
        <div>
          <div className="my-2 px-8 flex justify-between">
            <h1 className="font-semibold">Top Rated</h1>
            <p className="text-xs">
              <Link href="movies/top-rated">View All &gt;</Link>
            </p>
          </div>
          <Card data={topRatedData} />
        </div>
        <div>
          <div className="my-2 px-8 flex justify-between">
            <h1 className="font-semibold">Coming Soon</h1>
            <p className="text-xs">
              <Link href="movies/coming-soon">View All &gt;</Link>
            </p>
          </div>
          <Card data={upcomingData} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const playingData = await fetchData("movie/now_playing");
  const popularData = await fetchData("movie/popular");
  const topRatedData = await fetchData("movie/top_rated");
  const upcomingData = await fetchData("movie/upcoming");
  return { props: { playingData, popularData, topRatedData, upcomingData } };
}
export default Home;
