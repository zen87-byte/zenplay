import React, { useState } from "react";
import Layout from "./Layout/Layout";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useParams } from "next/navigation";

export function Collection({ data }) {
  const items = data;
  const router = useRouter();
  const params = useParams();
  const category = params.category;
  return (
    <Layout>
      <div className="mx-16">
        <div className="my-2">
          <button onClick={() => router.back()}>
            <Link href="/">&lt; Back</Link>
          </button>
        </div>
        <div className="grid grid-cols-10 gap-4">
          {items.map((item, index) => (
            <div key={index}>
              <Link
                href={`/movie/${category}/${item.id}?title=${item.title}`}
                passHref
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Image
                      className="rounded-md m-auto"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={`${item.title}`}
                      width={500}
                      height={500}
                      loading="lazy"
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
