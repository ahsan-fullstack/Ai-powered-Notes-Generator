import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRightFromBracket, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

export const SideBar = ({ onNewChat }) => {
  const [open, setOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const getSpecificChat = async (item) => {
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/chat/${item._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const results = await res.json()
    navigate(`/c/${results.results.chatId}`, {
      state: {
        results: results,
      }
    })
    console.log(results.results, 'item')
  }

  const fetchChats = async () => {
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
        className={`h-screen border-r-[1px] border-[#2e2a22] text-white flex flex-col py-3 px-1 transition-[width] duration-500
          relative ease-in-out ${open ? "w-[20%]" : "w-[4%]"
          }`}
      >
        <div className={`flex items-center ${!open && 'justify-center'} justify-between mb-5! px-2`}>
          <div className={`${!open && 'hidden'} logo-icon bg-[#c9a84c] h-[2rem] w-[2rem] flex items-center justify-center rounded`}>📚</div>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
          >
            {open ? "⮜" : "⮞"}
          </button>
        </div>
        {/* New Chat */}
        <div className="mb-6" >
          <button
            type="button"
            onClick={onNewChat}
            className={`flex items-center ${!open && 'justify-center'} px-2 py-2 rounded-lg cursor-pointer  hover:bg-[#c9a84c] transition w-full`}
          >
            <FontAwesomeIcon icon={faEdit} className={`${open && 'pr-3'}`} />
            {open && "New Chat"}
          </button>

          <div className={`flex items-center ${!open && 'justify-center'} px-2 py-2 rounded-lg cursor-pointer hover:bg-[#c9a84c] transition`}>
            <FontAwesomeIcon icon={faSearch} className={`${open && 'pr-3'}`} />
            {open && "Search Chat"}
          </div>
        </div>

        {/* <!-- Chat List --> */}
        <div className={`${!open && 'hidden'} flex-1 py-3 space-y-2 px-2`}>
          <h2 className="text-[#7d7568]">Recent</h2>
          {/* <!-- Chat Item --> */}
          {chatHistory.map((item, index) => (
            <div onClick={() => getSpecificChat(item)} key={index} className="p-3 rounded-md hover:bg-gray-800 cursor-pointer">
              <p className="text-sm truncate">{item.title}</p>
            </div>
          ))}


        </div>

        {/* Logout */}
        <div className="mt-auto">
          <div onClick={logout} className="w-full text-center py-2 rounded-lg cursor-pointer hover:bg-red-600 transition
          flex items-center justify-center gap-2">
            {open && "Logout"}
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      </aside>
    </>
  );
};