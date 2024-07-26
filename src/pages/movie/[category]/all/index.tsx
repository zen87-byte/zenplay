import React from "react";
import { fetchCategory } from "@utils/fetch";
import { Collection } from "@components/Collection";

export function CollectionPage({ data, page }) {
  const items = data.results;
  console.log(page);
  return (
    <>
      <Collection data={items} page={page}/>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page;
  const pathname = query.category;
  const data = await fetchCategory(`movie/${pathname}?language=en-US&page=${page}`);
  return { props: { data, pathname, page } };
}
export default CollectionPage;
