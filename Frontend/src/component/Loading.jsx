export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full w-full font-serif">
      <span className="loader"></span>
      <div className="loading-text-wrapper">
        <h1 className="text-2xl font-bold text-[#fff]">Generating your study materials...</h1>
        <h3 className="text-lg text-[#7d7568]">Model is analyzing your pdf...</h3>
      </div>
    </div>
  )
} 