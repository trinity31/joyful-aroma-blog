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

export async function getStaticPaths({ locales }) {
  console.log("getStaticPaths, locales: ");

  let allPages = [];

  for (const locale of locales) {
    // Call the getAllNotionPages function for the current locale
    const pages = await getAllNotionPages(locale);
    // Concatenate the result array with the allPages array
    allPages = allPages.concat(pages);
  }
  // const allPages = await getAllNotionPages();

  console.log("allPages length:", allPages.length);
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
