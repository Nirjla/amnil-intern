export default function SecondaryButton({ title, onClick }: {
      title: string, onClick: () => void
}) {
      return (<>
            <button
                  onClick={onClick}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
                  {title}              </button>
      </>)
}