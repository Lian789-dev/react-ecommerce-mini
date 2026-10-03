export default function Header() {
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="h-20 w-20 rounded-full bg-green-600"></div>
        <div>
          <div className="flex h-fit items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p>Lili Lian</p>
          </div>
          <p>085724720023</p>
        </div>
      </div>
    </div>
  );
}
