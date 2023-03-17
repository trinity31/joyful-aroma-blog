import PostsGrid from "../posts/post-grid";
import classes from "./featured-posts.module.css";
import { useTranslation } from "next-i18next";

export default function FeaturedPosts(props) {
  const { t } = useTranslation("common");

  return (
    <section className={classes.latest}>
      <h2>{t("featured_posts")}</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
