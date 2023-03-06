import { getAllNotionPages, getNotionPage } from "@/lib/notion-util";
import PostContent from "../../components/posts/post-detail/post-content";

export default function PostDetailPage(props) {
  return <PostContent post={props.post} />;
}

export async function getStaticProps(context) {
  const { params } = context;
  const [slug, id] = params.params;

  const postData = await getNotionPage(id);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const allPages = await getAllNotionPages();

  // console.log("allPages:");
  // console.log(allPages);

  return {
    paths: allPages.map((page) => ({
      params: {
        params: [page.slug, page.id],
      },
    })),
    fallback: false,
  };
}
