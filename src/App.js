import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';
import Cursors from './components/Cursors';

function App() {

  // Holds array of Hosts 
  const [searchResults, updateSearchResults] = useState([]);

  // State of the page (INIT, LOADING, SUCCESS, ERROR)
  const [status, setStatus] = useState("INIT");

  // Used to display error messages or warnings to the user
  const [message, setMessage] = useState("");

  // Holds page iterators, used to render Prev and Next buttons
  const [cursors, setCursors] = useState(["", ""]);

  // Tracks current position in Page Iterator (page number)
  const [pageNum, setPageNum] = useState(0);

  // Current Search parameters, Updated by cursor and search components
  const [currParams, setCurrParams] = useState({
    q: "",
    per_page: 10,
    virtual_hosts: "EXCLUDE",
    sort: "RELEVANCE",
    cursor: ""
  })

  // Base URL of Censys Search API
  const baseUrl = "https://search.censys.io/api/v2/hosts/search";

  // FIXME store authentication details in .env 
  const id = process.env.REACT_APP_API_ID
  const secret = process.env.REACT_APP_API_SECRET

  console.log(id)
  console.log(secret)


  // Perform a new Search query
  function searchQuery(newParams, newPageNum) {
    // Update DOM to indicate Loading Status
    setCursors(["", ""]); // Clears Prev and Next button
    setStatus("LOADING"); // triggers Loading message in ResultList

    // Make GET request to Search endpoint with updated parameters
    axios.get(baseUrl, {
      params: newParams, auth: {
        username: id,
        password: secret
      }
    }).then(res => {
      if (res.data.status === "OK") {
        const resultInfo = res.data.result;
        setCursors([resultInfo.links.prev, resultInfo.links.next])

        console.log([resultInfo.links.prev, resultInfo.links.next])
        updateSearchResults(resultInfo.hits)
        setStatus("SUCCESS");
        setMessage("");
        setCurrParams(newParams)
        setPageNum(newPageNum)
        console.log("Page num: " + newPageNum)
      } else {
        setStatus("ERROR");
        setMessage(res.data.status)
      }
      console.log(res.data);
    }).catch(error => {
      const error_message = error.response.data.error;
      setStatus("ERROR")
      setMessage(error_message)
      setCursors(["", ""])
      console.error(error_message);
    })
  }

  return (
    <div className="page-container">
      <h1>Censys Search</h1>
      <SearchBar updateParams={setCurrParams} currParams={currParams} searchFunc={searchQuery} />
      <ResultList status={status} results={searchResults} message={message} pageNum={pageNum} perPage={currParams.per_page} />
      <Cursors cursors={cursors} updateParams={setCurrParams} currParams={currParams} searchFunc={searchQuery} pageNum={pageNum} />
    </div>
  );
}

export default App;
