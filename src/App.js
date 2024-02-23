import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';
import Cursors from './components/Cursors';

function App() {

  // Holds State Info for the page
  const [pageState, setPageState] = useState({
    status: "INIT",
    message: "",
    pageNum: 0,
    search_results: [],
    cursors: {
      next: "",
      prev: ""
    },
    search_params: {
      q: "",
      per_page: 10,
      virtual_hosts: "EXCLUDE",
      sort: "RELEVANCE",
      cursor: ""
    }
  })

  // Base URL of Censys Search API
  const baseUrl = "https://search.censys.io/api/v2/hosts/search";

  // Authentication details for API
  const id = process.env.REACT_APP_API_ID
  const secret = process.env.REACT_APP_API_SECRET

  // Perform a new Search query
  function searchQuery(newParams, newPageNum) {

    // Update DOM to indicate Loading Status
    setPageState({
      status: "LOADING",
      message: "",
      pageNum: newPageNum,
      search_results: [],
      cursors: {
        next: "",
        prev: ""
      },
      search_params: newParams
    })

    // Make GET request to Search endpoint with updated parameters
    axios.get(baseUrl, {
      params: newParams, auth: {
        username: id,
        password: secret
      }
    }).then(res => {
      // If Call is Successful
      const resultInfo = res.data.result;

      setPageState({
        status: "SUCCESS",
        message: "",
        pageNum: newPageNum,
        search_results: resultInfo.hits,
        cursors: resultInfo.links,
        search_params: newParams
      })

    }).catch(error => {
      const error_message = error.response.data.error;
      setPageState({
        status: "ERROR",
        message: error_message,
        pageNum: 0,
        search_results: [],
        cursors: {
          next: "",
          prev: ""
        },
        search_params: newParams
      })

    })
  }

  return (
    <div className="page-container">
      <h1>Censys Search</h1>
      <SearchBar currParams={pageState.search_params} searchFunc={searchQuery} />
      <ResultList pageState={pageState} />
      <Cursors pageState={pageState} searchFunc={searchQuery} />
    </div>
  );
}

export default App;
