import React, {useState} from "react"
import axios from "axios"
import Select  from "react-select"

import "./Summarize.css"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function SummarizeText (){

  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [useGPT, setUseGPT] = useState(false)
  const [loading, setLoading] = useState(false)

  const yesORno = [
    { value: false, label: "No" },
    { value: true, label: "Yes" }
  ]

  const handleSummarize = async ()=>{
    if (!text.trim()) return alert("Enter some text to summarize")
    console.log(API_BASE_URL)
    setLoading(true)
    try{

      const response = await axios.post(`${API_BASE_URL}/summarize`, {text,useGPT})

      console.log("Received response:", response.data);
      setSummary(response.data.summary)
    }
    catch (error)
    {
      console.error("Error Summarizing Text: ",error)
      setSummary("Failed to Summarize")
    }
    setLoading(false)
  }

  return(
    <div className="mainDiv">
    <div className="text-area-div">
    <h2>Enter the Text</h2>
    <textarea 
    className="text-area-input-field"
    value={text}
    onChange={(e)=>{setText(e.target.value)}}
    placeholder="Paste/Type your text here...">
    </textarea>
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
    <button className="submit-button" onClick={handleSummarize} disabled={loading}>{loading ?"Summarizing...":"Summarize"}</button>
    </div>
    <div className="output-box">
    
    {summary && <p><strong>{summary}</strong></p>}
    </div>
    </div>
  )
}
export default SummarizeText