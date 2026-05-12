import { useEffect, useRef, useState } from "react"
import { Navbar } from './Navbar'
import { FilePreview } from "./FilePreview"
import { UploadBox } from "./Upload"
import { SideBar } from "./SideBar"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"

function Home() {
  const [imageUrl, setImageUrl] = useState(null)
  const [file, setFile] = useState("")
  const [message, setMessage] = useState("")
  const [chatId, setChatId] = useState("")
  const navigate = useNavigate()


  const handleChanges = async (file, baseUrl) => {
    setFile(file);
    setImageUrl(baseUrl);
  }

  const handleRemoveFile = () => {
    setFile("");
    setImageUrl(null);
  }

  const submitData = async (formData) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })

      const result = await response.json()
      console.log('Submission Successful', result)
      setChatId(result.chatId);
      navigate(`/c/${result.chatId}`, {
        state: {
          results: result,
        }
      })

    } catch (error) {
      console.log('Submission Failed', error)
    }
  }

  return (
    <>
      <div className="font-serif relative text-center w-[80%]">
        <div className="chat-container w-full flex flex-col items-center justify-center h-full p-4 rounded-lg">

          <div className="inner-wrapper pb-[30px]
                flex flex-col items-center 
                justify-center h-full gap-3 
                text-center">
            <h1 className="text-[3rem] font-bold leading-[0.9] pb-[1rem]">
              Transform your PDFs into
              <br></br>
              <em className="text-[2rem] text-[#c9a84c] italic font-bold">
                Study-ready materials
              </em>
            </h1>
            <p className='max-w-[75%] font-sans text-[#7d7568] tracking-wider'>Upload any PDF and instantly get a summary, flashcards, and structured notes.</p>
          </div>

          {file ? (
            <>
              <FilePreview file={file}
                onRemoveFile={handleRemoveFile}
                onSubmit={submitData} />
            </>
          ) : (
            <UploadBox onFileSelect={handleChanges} />
          )}
        </div>
      </div>
    </>
  )
}

export default Home