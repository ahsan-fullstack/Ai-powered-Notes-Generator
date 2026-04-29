import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const SideBar = ({ onNewChat }) => {
  const [open, setOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const fetchChats = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/chat`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const chats = await response.json();
    console.log(chats, 'chat')
    setChatHistory(chats)
  }

  useEffect(() => {
    fetchChats();
  }, [])

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`h-screen border-r-[1px] border-[#2e2a22] text-white flex flex-col py-3 px-3 transition-[width] duration-500
          relative ease-in-out ${open ? "w-[15%]" : "w-[4%]"
          }`}
      >
        <div className="flex items-center justify-between mb-5!">
          <div className="logo-icon bg-[#c9a84c] h-[2rem] w-[2rem] flex items-center justify-center rounded">📚</div>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
          >
            {open ? "⮜" : "⮞"}
          </button>
        </div>
        {/* New Chat */}
        <div className="space-y-2 mb-6">
          <button
            type="button"
            onClick={onNewChat}
            className="flex items-center px-3 py-2 rounded-lg cursor-pointer  hover:bg-[#c9a84c] transition w-full"
          >
            {open ? "+ New Chat" : "+"}
          </button>

          <div className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#c9a84c] transition">
            {open ? "Search Chat" : <FontAwesomeIcon icon={faSearch} />}
          </div>
        </div>

        <div className="border-t border-[#2e2a22] mb-4"></div>

        {/* <!-- Chat List --> */}
        <div class="flex-1 overflow-y-auto p-3 space-y-2">

          {/* <!-- Chat Item --> */}
          {chatHistory.map((item) => (
            <div class="p-3 rounded-md hover:bg-gray-800 cursor-pointer">
              <p class="text-sm truncate">{item.title}</p>
            </div>
          ))}


        </div>

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