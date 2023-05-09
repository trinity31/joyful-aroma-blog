export default function OilsList({ oils }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {oils.map((oil) => (
        <div
          key={oil.id}
          className="bg-white shadow-md rounded-md overflow-hidden flex flex-col sm:flex-row"
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
          </div>
        </div>
      ))}
    </div>
  );
}
