import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useState } from "react";
import { renderers } from "../../../lib/markdown-renderers";

export default function PostContent({ post }) {
  const [imgError, setImgError] = useState(false);

  const imagePath = `/images/posts/${post.slug}.jpeg`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={post.image} />

      <div
        style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
      >
        {imgError ? (
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "10px" }}
          />
        ) : (
          <Image
            src={imagePath}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "10px" }}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <ReactMarkdown className="markdown" components={renderers}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
