import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ meta, onPageClick }) {
  function onClick(ev, link) {
    ev.preventDefault();
    if (!link.url) {
      return;
    }
    onPageClick(link);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={(ev) => onClick(ev, meta.links[0])}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={(ev) => onClick(ev, meta.links[meta.links.length - 1])}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of &nbsp;
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          {meta.total > meta.per_page && (
            <nav
              className="isolate inline-flex rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {meta.links &&
                meta.links.map((link, ind) => (
                  <a
                    href="#"
                    onClick={(ev) => onClick(ev, link)}
                    key={ind}
                    aria-current="page"
                    className={
                      "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " +
                      (ind === 0 ? "rounded-l-md cursor-not-allowed " : "") +
                      (ind === meta.links.length - 1
                        ? "rounded-r-md cursor-not-allowed "
                        : "") +
                      (link.active
                        ? "border-indigo-700 bg-indigo-700 text-white "
                        : "") +
                      (!link.active ? "hover:bg-gray-50 " : "")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  >
                    {/* relative z-10 inline-flex items-center bg-indigo-600 px-4
                    py-2 text-sm font-semibold text-white focus:z-20
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-indigo-600 */}
                  </a>
                ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
