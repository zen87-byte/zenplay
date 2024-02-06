import React from "react";
import { fetchCategory } from "@utils/fetch";
import { Collection } from "@components/Collection";

export function CollectionPage({ data }) {
  const items = data.results;
  return (
    <>
      <Collection data={items} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const pathname = params.category;
  const data = await fetchCategory(`movie/${pathname}`);
  return { props: { data, pathname } };
}
export default CollectionPage;
