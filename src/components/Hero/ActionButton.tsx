import { FaRegPlayCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export default function ActionButton({ action_1, action_2 }) {
  return (
    <>
      <div className="my-4 flex gap-4">
        <button className="flex items-center gap-2 px-4 py-1 bg-white text-black rounded-md">
          <FaRegPlayCircle />
          <p>{action_1}</p>
        </button>
        <button className="flex items-center gap-2 px-4 py-1 border border-white rounded-md">
          <FaPlus />
          <p>{action_2}</p>
        </button>
      </div>
    </>
  );
}
