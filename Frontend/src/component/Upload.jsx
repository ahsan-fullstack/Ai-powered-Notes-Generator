import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FileUpload } from "../utils/FileUpload"


export const UploadBox = ({ onFileSelect }) => {

  const handleChanges = async (e) => {
    console.log(e, 'event');
    const selectedFile = e.target.files[0]

    const base64ImageUrl = await FileUpload(selectedFile)

    onFileSelect(selectedFile, base64ImageUrl);
    e.target.value = ""
  }
  return (
    <>
      <div className="main-wrapper relative py-[20px]
            flex flex-col items-center justify-center gap-2 bg-[#1a1814] border-[2px]
            border-[#1a1814] w-[70%] rounded-lg cursor-pointer
            transition-all duration-500 ease-in-out
            hover:bg-[#c9a84c2b] hover:border-[#7b6c46]
            border-dashed">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChanges}
          className="opacity-0 inset-0 absolute cursor-pointer"
        />

        <div className="upload-area flex flex-col items-center justify-center gap-2 text-center">
          <FontAwesomeIcon icon={faArrowUp} className="text-[#e8d6d6] text-[30px] pb-[10px]" />
          <div className="font-['Playfair_Display'] text-[20px] font-semibold text-[#e8d6d6] mb-2">Drop your PDF here</div>
          <div className="text-[#7d7568] text-sm pb-4">Drag &amp; drop or click to browse<br />PDF files up to 20MB</div>
        </div>

        <button className="bg-[#c9a84c] text-black font-bold font-sans 
                py-[10px] px-[24px] rounded-lg">
          Choose PDF
        </button>

      </div>
    </>
  )
}