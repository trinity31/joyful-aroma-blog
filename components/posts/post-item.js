import classes from "./post-item.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PostItem(props) {
  const { title, image, excerpt, date, slug, id } = props.post;
  const [imgError, setImgError] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long", //1 => "January"
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}.jpeg`;

  const linkPath = `/posts/${slug}/${id}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          {imgError ? (
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
              style={{ borderRadius: "10px" }}
            />
          ) : (
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
              style={{ borderRadius: "10px" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
