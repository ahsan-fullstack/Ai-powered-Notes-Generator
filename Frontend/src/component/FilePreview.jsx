import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Loading } from './Loading'

export const FilePreview = ({ file, onRemoveFile, onSubmit }) => {
  const [loading, setLoading] = useState(false)

  const submitData = async () => {
    const formData = new FormData();

    formData.append('pdfFile', file)
    try {
      setLoading(true);
      await onSubmit(formData)
    } catch (error) {
      console.log('Submission Failed', error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="file-container w-[70%] mb-[1rem]!">
            <div className="p-3 relative rounded-xl bg-[var(--surface2)] border border-[var(--border)]  flex items-center justify-between gap-4">
              <div className="file-preview flex items-center gap-4">
                <div className="border-[#7a6330] bg-[#7a6330] border-[20px] rounded h-[48px] w-[48px] flex items-center justify-center bg-[#e8d6d6]">
                  <FontAwesomeIcon icon={faFilePdf} className="text-[#fff] text-[24px]" />
                </div>
                <p className="text-xl text-[var(--text)]">
                  {file.name}
                </p>
              </div>
              <FontAwesomeIcon icon={faXmark} className="text-[var(--text)] absolute top-7 right-6 cursor-pointer" onClick={onRemoveFile} />
            </div>


          </div>
          <button className="bg-[#c9a84c] text-black font-bold font-sans w-[70%] cursor-pointer
          py-[10px] px-[24px] rounded-lg"
            onClick={submitData}>
            ✦ Generate Study Materials
          </button>
        </>
      )}
    </>
  )
}