import Hero from "@components/Hero/Hero";
import { fetchCategory } from "@utils/fetch";

const HeroSection = ({ data }) => {
  return <Hero data={data} />;
};

export async function getServerSideProps() {
  const data = await fetchCategory("movie/popular");
  return { props: { data } };
}

export default HeroSection;