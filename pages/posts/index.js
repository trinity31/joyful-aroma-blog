import AllPosts from "@/components/posts/all-posts";
import { getAllNotionPages } from "@/lib/notion-util";

export default function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export async function getStaticProps() {
  const notionPages = await getAllNotionPages();
  return {
    props: {
      posts: notionPages,
    },
    revalidate: 600,
  };
}
