import Link from "next/link";
import Label from "@/components/ui/label";

export default function TagLabel({ tags }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags?.length &&
        tags.map((tag) => (
          <Link href={`/search/${tag}`} key={tag}>
            <Label
              className="inline-block text-xs font-medium tracking-wider uppercase"
              // onClick={() => handleClick(tag.name)}
            >
              {tag}
            </Label>
          </Link>
        ))}
    </div>
  );
}
