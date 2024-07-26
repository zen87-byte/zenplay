import React, { useState } from "react";
import Layout from "./Layout/Layout";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useParams } from "next/navigation";

export function Collection({ data, page }) {
  const items = data;
  const currentPage: number = +page;
  const router = useRouter();
  const path = router.asPath.slice(0, -1);
  console.log(path)
  const params = useParams();
  const category = params.category;
  return (
    <Layout>
      <div className="xs:mx-4 md:mx-8 lg:mx-12 xl:mx-16">
        <div className="my-2">
          <button onClick={() => router.back()}>
            <Link href="/">&lt; Back</Link>
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2 md:gap-4 place-content-center">
          {items.map((item, index) => (
            <div key={index}>
              <Link
                href={`/movie/${category}/${item.id}?title=${item.title}`}
                passHref
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Image
                      className="rounded-md m-auto w-24 md:w-32 lg:w-52 md"
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
        <div className="my-2 sm:my-4 md:my-6 lg:my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 && (
                  <PaginationPrevious
                    href={`${path}${currentPage - 1}`}
                  />
                )}
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`${path}${currentPage}`}
                  isActive
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`${path}${currentPage + 1}`}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={`${path}${currentPage + 2}`}
                >
                  {currentPage + 2}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`${path}${currentPage + 1}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
}
