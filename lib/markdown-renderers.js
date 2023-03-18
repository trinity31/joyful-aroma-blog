export const renderers = {
  h1: ({ children }) => (
    <>
      {/* <br /> */}
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    </>
  ),
  h2: ({ children }) => (
    <>
      {/* <br /> */}
      <h2 className="text-2xl font-semibold my-3">{children}</h2>
    </>
  ),
  h3: ({ children }) => (
    <>
      {/* <br /> */}
      <h3 class="text-lg my-2">{children}</h3>
    </>
  ),
  p: ({ children }) => <p className=" my-2">{children}</p>,
  ul: ({ children }) => <ul className="list-disc">{children}</ul>,
  li: ({ children }) => (
    <li className="list-item text-base my-2">{children}</li>
  ),
};
