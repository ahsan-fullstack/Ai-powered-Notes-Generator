import { useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faPlus, faXmark, faRobot, faFile, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { Navbar } from './navbar'
import { FilePreview } from "./FilePreview"
import { UploadBox } from "./Upload"

function ChatBox() {
  const [imageUrl, setImageUrl] = useState(null)
  const [file, setFile] = useState("")
  const [message, setMessage] = useState("")


  const handleChanges = async (file, baseUrl) => {
    setFile(file);
    setImageUrl(baseUrl);
  }
  const handleRemoveFile = () => {
    setFile("");


    setImageUrl(null);
  }

  const submitData = async (formData) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/chat`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      console.log(result, 'result  ')
      return result;
    } catch (error) {
      console.log('Submission Failed', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center font-serif relative text-center">
        <div className="chat-container flex items-center justify-center w-full ">
          <div className="w-[90%] h-[100vh]">

            <div className="flex items-center flex-col justify-center h-full gap-[20px] p-4
            rounded-lg">

              <div className="flex items-center gap-3">
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
                  <p className='max-w-[70%] pb-[4rem] font-sans text-[#7d7568] tracking-wider'>Upload any PDF and instantly get a summary, flashcards, and structured notes.</p>
                </div>
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
        </div>
      </div>
    </>
  )
}

export default ChatBox