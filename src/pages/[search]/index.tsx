import { useRouter } from "next/router";
import { getQuerySearch } from "../../utils/getQuerySearch";
import Layout from "../../components/Layout/Layout";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import LoadingSuspense from "../../components/Loading/Loading";
import { Collection } from "../../components/Collection";
import { fetchQuerySearch } from "@utils/fetch";

export default function Page({ data, query }) {
  const res = data.results;
  if (data) {
    return <Collection data={res} />;
  } else {
    return <LoadingSuspense />;
  }
}

export async function getServerSideProps(context) {
  const { query } = context;
  const data = await fetchQuerySearch(query);
  return { props: { data, query } };
}
