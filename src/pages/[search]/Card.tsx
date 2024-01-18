import Layout from "../../components/Layout/Layout"
import { getQuerySearch } from "../../utils/getQuerySearch"

export default async function CardSearch({query} : {query: string}){
    const data = await getQuerySearch(query);
    console.log(data)
    return(
        <Layout>
            <div className="h-screen w-screen"></div>
        </Layout>
    )
}
