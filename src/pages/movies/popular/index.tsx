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
import { Collection } from "../../../components/Collection";

export function Popular({ data }) {
  const items = data.results;
  return (
    <Collection data={items}/>
  );
}

export async function getServerSideProps() {
  const data = await fetchData("movie/popular");
  return { props: { data } };
}
export default Popular;
