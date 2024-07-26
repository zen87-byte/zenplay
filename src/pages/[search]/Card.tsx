import Layout from "../../components/Layout/Layout"
// import { getQuerySearch } from "../../utils/getQuerySearch"
import { fetchQuerySearch } from "@utils/fetch";

export default async function CardSearch({query} : {query: string}){
    const data = await fetchQuerySearch(query);
    console.log(data)
    return(
        <Layout>
            <div className="h-screen w-screen"></div>
        </Layout>
    )
}
