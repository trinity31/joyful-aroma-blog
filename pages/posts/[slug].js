import { useRouter } from "next/router";
import PostContent from "./post-detail/post-content";

export default function PostDetailPage(props) {
  const router = useRouter();
  const { post } = router.query;
  const decodedPost = JSON.parse(post);

  return <PostContent post={decodedPost} />;
}
