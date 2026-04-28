import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const SideBar = ({ onNewChat }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`h-screen border-r-[1px] border-[#2e2a22] text-white flex flex-col py-3 transition-[width] duration-500
          relative ease-in-out ${open ? "w-[15%]" : "w-[4%]"
          }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {open ? "⮜" : "⮞"}
        </button>
        {/* New Chat */}
        <div className="space-y-2 mb-6">
          <button
            type="button"
            onClick={onNewChat}
            className="flex items-center justify-center px-3 py-2 rounded-lg cursor-pointer  hover:bg-[#c9a84c] transition w-full"
          >
            {open ? "+ New Chat" : "+"}
          </button>

          <div className="flex items-center justify-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#c9a84c] transition">
            {open ? "Search Chat" : <FontAwesomeIcon icon={faSearch} />}
          </div>
        </div>

        <div className="border-t border-gray-700 mb-4"></div>

        {/* Logout */}
        <div className="mt-auto">
          <div className="w-full text-center px-3 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition
          flex items-center justify-center gap-2">
            {open && "Logout"}
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      </aside>
    </>
  );
};