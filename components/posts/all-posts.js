import classes from "./all-posts.module.css";
import PostsGrid from "./post-grid";
import { useTranslation } from "next-i18next";

export default function AllPosts(props) {
  const { t } = useTranslation("common");

  return (
    <section className={classes.posts}>
      <h1>{t("all_posts")}</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
