import Link from "next/link";
import TagLabel from "./ui/tag-label";

export default function OilsList({ oils }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {oils.map((oil) => (
        <div
          key={oil.id}
          className="bg-white shadow-md rounded-md overflow-hidden flex flex-col sm:flex-row hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:shadow-outline transition-all duration-100 ease-in-out"
        >
          <Link
            href={`/posts/${oil.slug}`}
            className="flex flex-col sm:flex-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`/images/posts/${oil.slug}.jpeg`}
              alt={oil.title}
              className="sm:w-40 sm:h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-center">
              <h2 className="text-lg font-medium text-gray-800 text-center sm:text-left">
                {oil.title}
              </h2>

              <p className="mt-2 text-gray-600">{oil.excerpt}</p>
              <p className="mt-2 text-sm font-medium text-gray-500 uppercase">
                {oil.note} note
              </p>
              <div className="flex justify-left">
                <TagLabel tags={oil.symptoms} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
