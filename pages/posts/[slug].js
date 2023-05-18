import { getAllNotionPages, getNotionPage } from "@/lib/notion-util";
import PostContent from "../../components/posts/post-detail/post-content";
import Head from "next/head";

export default function PostDetailPage({ post }) {
  if (!post) {
    return <div>Loading...</div>; // or any other fallback component or message
  }
  const imageUrl = `https://aroma.joyfuljourney.today/_next/image?url=%2Fimages%2Fposts%2F${post.slug}.jpeg&w=1920&q=75`;
  return (
    <article>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article"></meta>
      </Head>
      <PostContent post={post} />
    </article>
  );
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
