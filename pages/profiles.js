import ProfilesPosts from "@/components/posts/profiles-posts";
import { getProfileNotionPages } from "@/lib/notion-util";

export default function ProfilePage(props) {
  return <ProfilesPosts posts={props.posts} />;
}

export async function getStaticProps() {
  const notionPages = await getProfileNotionPages();
  return {
    props: {
      posts: notionPages,
    },
  };
}
