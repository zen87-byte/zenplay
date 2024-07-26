import { useRouter } from "next/router";
// import { getQuerySearch } from "../../utils/getQuerySearch";
import Layout from "../../components/Layout/Layout";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import LoadingSuspense from "../../components/Loading/Loading";
import { Collection } from "../../components/Collection";
import { fetchQuerySearch } from "@utils/fetch";

export default function SearchPage({ data, query }) {
  const res = data.results;
  const page = query.page;
  console.log("query: ", query)
  console.log(res)
  if (data) {
    return <Collection data={res} page={page} />;
  } else {
    return <LoadingSuspense />;
  }
}

export async function getServerSideProps({ query }) {
  const data = await fetchQuerySearch(query.query, query.page);
  return { props: { data, query } };
}
