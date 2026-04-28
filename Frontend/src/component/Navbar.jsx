export const Navbar = () => {
  return (
    <>
      <div className="navbar border-b-[1px] border-[#2e2a22] p-[10px] w-full z-10">
        <header className="header flex items-center justify-between px-4 py-2">
          <div className="logo flex items-center gap-2">
            <div className="logo-icon bg-[#c9a84c] h-[2rem] w-[2rem] flex items-center justify-center rounded">📚</div>
            <div className="logo-text text-[20px]">Study<span className="text-[#c9a84c]">AI</span></div>
          </div>
          <div className="badge border-[1px] border-[#c9a84c] text-[#c9a84c] rounded-full py-1 px-3">AI Powered</div>
        </header>
      </div>
    </>
  )
}