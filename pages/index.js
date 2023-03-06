import { Fragment } from "react";
import Head from "next/head";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedNotionPages } from "@/lib/notion-util";
import Script from "next/script";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Aroma Journey</title>
        <meta
          name="description"
          content="Blog about essential oils and aromatherapy"
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADS_CLIENT_ID}`}
          crossorigin="anonymous"
        ></Script>
      </Head>
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps() {
  const notionPages = await getFeaturedNotionPages();
  return {
    props: {
      posts: notionPages,
    },
    revalidate: 600,
  };
}
