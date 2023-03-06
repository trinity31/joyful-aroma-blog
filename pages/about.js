import AboutPosts from "@/components/posts/about-posts";
import { getAboutNotionPages } from "@/lib/notion-util";

export default function AboutPage(props) {
  return <AboutPosts posts={props.posts} />;
}

export async function getStaticProps() {
  const notionPages = await getAboutNotionPages();
  return {
    props: {
      posts: notionPages,
    },
    revalidate: 600,
  };
}
