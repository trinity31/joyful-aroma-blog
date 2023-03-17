import { Fragment } from "react";
import Head from "next/head";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedNotionPages } from "@/lib/notion-util";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function HomePage(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("aroma_journey")}</title>
        <meta
          name="description"
          content="Blog about essential oils and aromatherapy"
        />
      </Head>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADS_CLIENT_ID}`}
        crossorigin="anonymous"
      ></Script>
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const notionPages = await getFeaturedNotionPages(locale);
  return {
    props: {
      posts: notionPages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 600,
  };
}
