import { useNavigate } from "react-router-dom";

export default function ButtonBack() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <button
      type="button "
      onClick={handleBack}
      aria-label="Back"
      className="cursor-pointer"
    >
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
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </button>
  );
}
