import { useRouter } from "next/router";
import { getQuerySearch } from "../../utils/getQuerySearch";
import Layout from "../../components/Layout/Layout";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import LoadingSuspense from "../../components/Loading/Loading";

export default function Page({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const params = useSearchParams();
  const[data, setData] = useState()
  const query = params.get('query')
  console.log(query);
  getQuerySearch(query).then((res)=>setData(res));
  console.log(data)
  return (
    <Layout>
      <div className="h-screen" />
    </Layout>
  );
}
