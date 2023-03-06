import classes from "./all-posts.module.css";
import PostsGrid from "./post-grid";

export default function ProfilesPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>Essential Oil Profiles</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
