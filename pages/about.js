import AboutPosts from "@/components/posts/about-posts";
import { getAboutNotionPages } from "@/lib/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AboutPage(props) {
  return <AboutPosts posts={props.posts} />;
}

export async function getStaticProps({ locale }) {
  const notionPages = await getAboutNotionPages();
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
