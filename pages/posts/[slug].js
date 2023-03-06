import { useRouter } from "next/router";
//import { getPostData, getPostsFiles } from "../../lib/posts-util";
import PostContent from "./post-detail/post-content";

export default function PostDetailPage(props) {
  const router = useRouter();
  const { post } = router.query;
  const decodedPost = JSON.parse(post);

  return <PostContent post={decodedPost} />;
}

// export function getStaticProps(context) {
//   const { params } = context;
//   const { slug } = params;

//   const postData = getPostData(slug);

//   return {
//     props: {
//       post: postData,
//     },
//     revalidate: 600,
//   };
// }

// export function getStaticPaths() {
//   const postFileNames = getPostsFiles();
//   const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
//   return {
//     paths: slugs.map((slug) => ({ params: { slug: slug } })),
//     fallback: false,
//   };
// }
