export default function Search() {
      return (
            <>
                  <div className="flex flex-col justify-center lg:flex-row items-center gap-5">

                        <div className="relative">
                              <input
                                    type="text"
                                    placeholder="Search for something"
                                    className="w-full lg:w-[374px] bg-gray-800 text-gray-400 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                              />
                              <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                              </svg>
                        </div>
                  </div>
            </>
      )
}