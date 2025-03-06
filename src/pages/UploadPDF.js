import React, {useState} from "react"
import axios from "axios"
import Select from "react-select"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 

function UploadPDF(){

  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState("")
  const [loading,setLoading]= useState(false)
  const [useGPT,setUseGPT] = useState(false)

  const yesORno = [
    { value: false, label: "No" },
    { value: true, label: "Yes" }
  ]

  const handleUpload = async()=>{
    if (!file) return alert("Please select a PDF file to upload")

    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("use_gpt", useGPT)
    try{
      const response = await axios.post(`${API_BASE_URL}/upload-pdf`, formData, {headers:{"Content-Type":"multipart/form-data"}})
      setSummary(response.data.summary)
    }
    catch (error)
    {
      console.error("Error uploading PDF: ", error)
      setSummary("Failed to summarize")
    }
    setLoading(false)
    
  }

  return(
    <div className="mainDiv">
    <div className="text-area-div">
    <h2>Upload & Summarize</h2>
    <input className="upload-button" type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])} />
    </div>
      <div className="select-button-div">
        <h3>Do you want to use GPT-4o for summarization?</h3>
        <Select
          className="select-button"
          placeholder="Use of GPT4"
          options={yesORno}
          defaultValue={yesORno[0]}
          onChange={(choice) => { setUseGPT(choice.value) }}
        />
      </div>
      <div className="submit-button-div">
        <button className="submit-button" onClick={handleUpload} disabled={loading}>{loading ? "Summarizing..." : "Summarize"}</button>
        </div>
        <div className="output-box">
        {summary && <p><strong>{summary}</strong></p>}
        </div>
    </div>
  )


}

export default UploadPDF