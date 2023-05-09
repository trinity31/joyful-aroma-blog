export const renderers = {
  h1: ({ children }) => (
    <>
      <br />
      <h1 className="text-3xl font-bold mt-4 mb-2">{children}</h1>
    </>
  ),
  h2: ({ children }) => (
    <>
      <br />
      <h2 className="text-2xl font-semibold my-3">{children}</h2>
    </>
  ),
  h3: ({ children }) => (
    <>
      <br />
      <h3 class="text-lg my-2">{children}</h3>
    </>
  ),
  img: ({ src, alt }) => (
    <div className="py-2">
      <img src={src} alt={alt} />
    </div>
  ),
  p: ({ children }) => (
    <>
      <p className="py-2 text-lg my-2">{children}</p>
    </>
  ),
  ul: ({ children }) => (
    <div className=" border-2 rounded-lg p-4 py-2 mt-2">
      <ul className="list-disc list-inside !important">{children}</ul>
    </div>
  ),
  ol: ({ children }) => (
    <div className="border-1 rounded-lg p-4 py-2">
      <ol className="list-decimal list-inside !important">{children}</ol>
    </div>
  ),
  li: ({ children }) => <li className="list-item text-lg my-2">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="bg-gray-100 border-l-4 border-gray-400 italic pl-4 py-2 my-4">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    return (
      <div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {children}
        </a>
      </div>
    );
  },
};
