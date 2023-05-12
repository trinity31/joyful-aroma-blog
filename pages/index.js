import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedNotionPages } from "@/lib/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage(props) {
  return (
    <>
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const notionPages = await getFeaturedNotionPages(locale);
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
