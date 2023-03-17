import ProfilesPosts from "@/components/posts/profiles-posts";
import { getProfileNotionPages } from "@/lib/notion-util";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ProfilePage(props) {
  return <ProfilesPosts posts={props.posts} />;
}

export async function getStaticProps({ locale }) {
  const notionPages = await getProfileNotionPages();
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
