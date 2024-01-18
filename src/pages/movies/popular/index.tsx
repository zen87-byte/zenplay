import React from "react";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout/Layout";
import { fetchData } from "../../../utils/fetch";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import Link from "next/link";
import { useRouter } from "next/router";

export function Popular({ data }) {
  const items = data.results;
  const router = useRouter();
  return (
    <Layout>
      <div className="w-10/12 m-auto">
        <div className="my-2">
          <button onClick={() => router.back()}>
            <Link href="/">&lt; Back</Link>
          </button>
        </div>
        <div className="w-full my-4 gap-4 flex flex-wrap justify-between">
          {items.map((item, index) => (
            <div key={index}>
              <Link href={`/movies/${item.id}?title=${item.title}`} passHref>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <img
                      className="rounded-md w-48 "
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={`${item.title}`}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-72 z-50 p-2 bg-[#030712] border rounded-md">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="line-clamp-5 text-xs">{item.overview}</p>
                  </HoverCardContent>
                </HoverCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await fetchData("movie/popular");
  return { props: { data } };
}
export default Popular;
