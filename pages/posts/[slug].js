import { getAllNotionPages, getNotionPage } from "@/lib/notion-util";
import PostContent from "../../components/posts/post-detail/post-content";

export default function PostDetailPage(props) {
  if (!props.post) {
    return <div>Loading...</div>; // or any other fallback component or message
  }

  return <PostContent post={props.post} />;
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = await getNotionPage(slug, context.locale);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths({ locales }) {
  let allPages = [];

  for (const locale of locales) {
    const pages = await getAllNotionPages(locale);
    allPages = allPages.concat(pages);
  }

  return {
    paths: allPages.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: true,
  };
}
