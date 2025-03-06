import React from "react"
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom"
import SummarizeText from "./pages/SummarizeText";
import UploadPDF from "./pages/UploadPDF";
import SearchPapers from "./pages/SearchPapers";

import "./App.css"

function App()
{
  return (
    <Router>
      <div className="container">
      <div className="heading">
      <h1>AI Research Summarizer</h1>
      </div>
      <div className="about">
      <h4>This tool is designed for summarizing academic research papers.
      <br></br>There are 3 options for looking up and summarizing research papers.
      <br></br>1. It is to enter a title related to the academic paper you are looking for and summarizing that.
      <br></br>2. Is to upload a research paper and then summarize that.
      <br></br>3. To find multiple papers from ArXiv database regarding a certain topic and summarizing them.
            <br></br><h3>For any of these options the user can choose if they want to use GPT-4o for summarizing or a free model LED </h3></h4>
      </div>
        <div className="nav-link-display">
        <nav>
        <Link className="nav-links" to="/">Summarize Text</Link>
        <Link className="nav-links" to="/upload-pdf">Upload & Summarize PDF</Link>
        <Link className="nav-links" to="/search-papers">Search & Summarize Papers</Link>       
        </nav>
        </div>
        <div className="route-content">
        <Routes>
        <Route path="/" element={<SummarizeText />} />
        <Route path="/upload-pdf" element={<UploadPDF />} />
        <Route path="/search-papers" element={<SearchPapers />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App