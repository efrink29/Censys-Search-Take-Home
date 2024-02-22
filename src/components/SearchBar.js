import React, { useState } from 'react'; // Import React and useState hook
import './styles/SearchBar.css';

function SearchBar(searchFunct) {
    // Initialize state for query, virtual_hosts, and sort
    const [query, setQuery] = useState('');
    const [virtualHosts, setVirtualHosts] = useState('EXCLUDE');
    const [sort, setSort] = useState('RELEVANCE');

    // Event handler for updating state when the query input changes
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    // Event handler for updating state when the virtual_hosts select changes
    const handleVirtualHostsChange = (event) => {
        setVirtualHosts(event.target.value);
    };

    // Event handler for updating state when the sort select changes
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    // Event handler for the search button click
    const handleSearchClick = () => {
        // Construct the params object with the updated state values
        const params = {
            query: query,
            virtual_hosts: virtualHosts,
            sort: sort
        };

        // Call the provided search function with the params object
        searchFunct(params);
    };

    return (
        <div className="search-div">
            <div className="text-in">
                <input type="text" placeholder="Enter Plaintext Query" value={query} onChange={handleQueryChange}></input>
            </div>
            <div className="filters">
                Virtual Hosts?
                <select id="virtual_hosts" name="Include Virtual Hosts" value={virtualHosts} onChange={handleVirtualHostsChange}>
                    <option value="EXCLUDE">Exclude</option>
                    <option value="INCLUDE">Include</option>
                </select>
                Sort By:
                <select id="sort" name="Sort By" value={sort} onChange={handleSortChange}>
                    <option value="RELEVANCE">Relevance</option>
                    <option value="ASCENDING">Ascending</option>
                    <option value="DESCENDING">Descending</option>
                </select>
                <button onClick={handleSearchClick}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;
