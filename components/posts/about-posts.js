import classes from "./all-posts.module.css";
import PostsGrid from "./post-grid";

export default function AboutPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>About Essential Oils</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
