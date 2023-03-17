import AllPosts from "@/components/posts/all-posts";
import { getAllNotionPages } from "@/lib/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export async function getStaticProps({ locale }) {
  const notionPages = await getAllNotionPages(locale);
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
