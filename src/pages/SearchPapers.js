import React , {useState} from "react"
import axios from "axios"
import Select from "react-select"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function SearchPapers() {
  const [query, setQuery] = useState("")
  const [numResults, setNumResults] = useState(3)
  const [useGPT, setUseGPT] = useState(false)
  const [source, setSource] = useState("arxiv")
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const sources = [{ value: "arxiv", label: "ArXiv" }]
  const yesORno = [
    { value: false, label: "No" },
    { value: true, label: "Yes" }
  ]

  const handleSearch = async () => {
    setLoading(true)
    setError("")
    setPapers([])

    try {
      const response = await axios.get(`${API_BASE_URL}/search-and-summarize`, {
        params: {
          source,
          query,
          num_results: numResults,
          use_gpt: useGPT
        }
      })
      setPapers(response.data.papers)
    }
    catch (err) {
      setError("Failed to fetch papers. Please try again!")
    }
    setLoading(false)
  }

  return (
    <div className="mainDiv">
    <div className="text-area-div">
    <h2>Research Paper Summarizer</h2>
    <div >
    <input
    className="input-container"
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Enter Research Topic"
    />
    </div>
    <div className="select-button-div">
    <h3>Select Source</h3>
    <Select
    placeholder="Select Source"
    options={sources}
    defaultValue={sources[0]}
    onChange={(option) => { setSource(option.value) }}
    />
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
      <div className="number-selector">
      <h3>Select the number of Papers you want to search!</h3>
      <input
      className="number-input"
      type="number"
      value={numResults}
      min="1"
      max="10"
      onChange={(e) => setNumResults(e.target.value)}
      />
      </div>
        

        <div className="submit-button-div">
          <button className="submit-button" onClick={handleSearch} disabled={loading}>{loading ? "Summarizing..." : "Summarize"}</button>
          
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="output-box">
        {papers.map((paper, index) => (
          <div key={index} className="paper">
            <h2>{paper.title}</h2>
            <p><strong>Authors:</strong> {paper.authors || "Unknown"}</p>
            <p><strong>Year:</strong> {paper.year}</p>
            <p><strong>Summary:</strong> {paper.summary}</p>
            <a href={paper.link} target="_blank" rel="noopener noreferrer">Read Full Paper</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPapers