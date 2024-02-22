import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar';

function App() {

  const [searchResults, updateSearchResults] = useState([]);
  const [status, setStatus] = useState("INIT");
  const [cursors, setCursors] = useState(["", ""]);

  const baseUrl = "https://search.censys.io/api/v2/hosts/search";

  const id = "a90e5fac-8b9d-4e9c-b973-e744e918005d"
  const secret = "HaGnEWnq6Rue2rAmTMZNdUdSlzGTdwqw"

  function searchQuery(searchParams) {
    // Call api
    const params = {
      q: searchParams.query,
      per_page: 10,
      virtual_hosts: searchParams.virtual_hosts,
      sort: searchParams.sort,
      cursor: cursors[0]
    };
    axios.get(baseUrl, {
      params: params, auth: {
        username: id,
        password: secret
      }
    }).then(res => {
      console.log(res);
    })

    // update search results
  }



  return (
    <div>
      <SearchBar searchFunct={searchQuery} />
    </div>
  );
}

export default App;
