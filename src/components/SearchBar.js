import React, { useState } from 'react'; // Import React and useState hook
import './styles/SearchBar.css';

function SearchBar(props) {
    // Initialize state for query, virtual_hosts, and sort
    const [query, setQuery] = useState('');
    const [virtualHosts, setVirtualHosts] = useState('EXCLUDE');
    const [sort, setSort] = useState('RELEVANCE');

    const currParams = props.currParams

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
            q: query,
            per_page: currParams.per_page,
            virtual_hosts: virtualHosts,
            sort: sort,
            cursor: ""
        };

        props.searchFunc(params, 0)
    }

    return (
        <div className="search-div" data-testid="search-bar">
            <div className="text-in">
                <input type="text" placeholder="Enter Plaintext Query" value={query} onChange={handleQueryChange}></input>
            </div>
            <div className="filters">
                Virtual Hosts?
                <select id="virtual_hosts" name="Include Virtual Hosts" value={virtualHosts} onChange={handleVirtualHostsChange} data-testid="virtual-hosts">
                    <option value="EXCLUDE">Exclude</option>
                    <option value="INCLUDE">Include</option>
                    <option value="ONLY">Only</option>
                </select>
                Sort By:
                <select id="sort" name="Sort By" value={sort} onChange={handleSortChange} data-testid="sort-by">
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
