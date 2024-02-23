import { render, screen, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import App from './App';
import Cursors from './components/Cursors';
import Result from './components/Result';
import ResultList from './components/ResultList';
import SearchBar from './components/SearchBar';
import axios from 'axios';

jest.mock('axios');

describe('SearchBar Component', () => {
  const mockSearchFunc = jest.fn();
  const currParams = { per_page: 10 };

  beforeEach(() => {
    // Clear all information stored in the mock function before each test
    mockSearchFunc.mockClear();
    render(<SearchBar searchFunc={mockSearchFunc} currParams={currParams} />);
  });

  it('updates the query input field and state correctly', () => {
    const input = screen.getByPlaceholderText('Enter Plaintext Query');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  it('updates the virtual hosts select and state correctly', () => {
    const select = screen.getByTestId('virtual-hosts');
    fireEvent.change(select, { target: { value: 'INCLUDE' } });
    expect(select.value).toBe('INCLUDE');
  });

  it('updates the sort select and state correctly', () => {
    const select = screen.getByTestId('sort-by');
    fireEvent.change(select, { target: { value: 'ASCENDING' } });
    expect(select.value).toBe('ASCENDING');
  });

  it('calls the search function with correct parameters when search button is clicked', () => {
    const queryInput = screen.getByPlaceholderText('Enter Plaintext Query');
    const virtualHostsSelect = screen.getByTestId('virtual-hosts');
    const sortSelect = screen.getByTestId('sort-by');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    // Simulate user interactions
    fireEvent.change(queryInput, { target: { value: 'test query' } });
    fireEvent.change(virtualHostsSelect, { target: { value: 'INCLUDE' } });
    fireEvent.change(sortSelect, { target: { value: 'DESCENDING' } });
    fireEvent.click(searchButton);

    // Check if searchFunc was called correctly
    expect(mockSearchFunc).toHaveBeenCalledWith({
      q: 'test query',
      per_page: 10,
      virtual_hosts: 'INCLUDE',
      sort: 'DESCENDING',
      cursor: ""
    }, 0);
  });
});

describe('Result Component', () => {
  it('displays the correct IP address and number of protocols', () => {
    const testProps = {
      ip: '192.168.1.1',
      services: ['HTTP', 'FTP', 'SSH']
    };

    render(<Result {...testProps} />);

    const ipElement = screen.getByText(/IP Address:/i);
    const protocolsElement = screen.getByText(/Number of Protocols:/i);

    expect(ipElement).toHaveTextContent(`IP Address: ${testProps.ip}`);
    expect(protocolsElement).toHaveTextContent(`Number of Protocols: ${testProps.services.length}`);
  });
});

describe('ResultList Component', () => {
  const baseProps = {
    pageState: {
      status: 'INIT',
      search_results: [],
      message: '',
      pageNum: 1,
      search_params: { per_page: 10 }
    }
  };

  it('displays loading message when status is LOADING', () => {
    render(<ResultList {...baseProps} pageState={{ ...baseProps.pageState, status: 'LOADING' }} />);
    expect(screen.getByText(/Loading Results.../i)).toBeInTheDocument();
  });

  it('displays error and message when status is ERROR', () => {
    const errorMessage = "Something went wrong";
    render(<ResultList {...baseProps} pageState={{ ...baseProps.pageState, status: 'ERROR', message: errorMessage }} />);
    expect(screen.getByText(/Error Fetching Results.../i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders correct number of results when status is SUCCESS', () => {
    const searchResults = [
      { ip: '192.168.1.1', services: ['HTTP'] },
      { ip: '192.168.1.2', services: ['SSH'] }
    ];
    render(<ResultList {...baseProps} pageState={{ ...baseProps.pageState, status: 'SUCCESS', search_results: searchResults }} />);
    const listItems = screen.getAllByTestId('result-item'); // Assuming you add data-testid="result-item" to each list item
    expect(listItems.length).toBe(searchResults.length);
  });

  it('renders an empty div when status is INIT', () => {
    render(<ResultList {...baseProps} />);
    const resultList = screen.getByTestId('result-list');
    expect(resultList).toBeEmptyDOMElement();
  });
});

describe('Cursors Component', () => {
  it('renders no buttons when both prev and next cursors are absent', () => {
    const props = {
      pageState: {
        cursors: { prev: '', next: '' },
        currParams: {},
        pageNum: 1
      },
      searchFunc: jest.fn()
    };

    render(<Cursors {...props} />);
    const buttons = screen.queryByRole('button');
    expect(buttons).toBeNull();
  });

  it('renders only the Previous button when only the prev cursor is present', () => {
    const props = {
      pageState: {
        cursors: { prev: 'prevCursor', next: '' },
        currParams: {},
        pageNum: 2
      },
      searchFunc: jest.fn()
    };

    render(<Cursors {...props} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.queryByText('Next')).toBeNull();
  });

  it('renders only the Next button when only the next cursor is present', () => {
    const props = {
      pageState: {
        cursors: { prev: '', next: 'nextCursor' },
        currParams: {},
        pageNum: 1
      },
      searchFunc: jest.fn()
    };

    render(<Cursors {...props} />);
    expect(screen.queryByText('Previous')).toBeNull();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('calls searchFunc with correct parameters when Next button is clicked', () => {
    const props = {
      pageState: {
        cursors: { prev: '', next: 'nextCursor' },
        currParams: { q: 'test', per_page: 10 },
        pageNum: 1
      },
      searchFunc: jest.fn()
    };

    render(<Cursors {...props} />);
    fireEvent.click(screen.getByText('Next'));
    expect(props.searchFunc).toHaveBeenCalledWith({
      q: 'test',
      per_page: 10,
      virtual_hosts: props.pageState.currParams.virtual_hosts,
      sort: props.pageState.currParams.sort,
      cursor: 'nextCursor'
    }, 2);
  });

  it('calls searchFunc with correct parameters when Prev button is clicked on page 1', () => {
    const props = {
      pageState: {
        cursors: { prev: 'prevCursor', next: 'nextCursor' },
        currParams: { q: 'test', per_page: 10 },
        pageNum: 1
      },
      searchFunc: jest.fn()
    };

    render(<Cursors {...props} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(props.searchFunc).toHaveBeenCalledWith({
      q: 'test',
      per_page: 10,
      virtual_hosts: props.pageState.currParams.virtual_hosts,
      sort: props.pageState.currParams.sort,
      cursor: '' // Should revert to page 0 i.e. no cursor
    }, 0);
  });
  it('calls searchFunc with correct parameters when Prev button is clicked on page 2', () => {
    const props = {
      pageState: {
        cursors: { prev: 'prevCursor', next: 'nextCursor' },
        currParams: { q: 'test', per_page: 10 },
        pageNum: 2
      },
      searchFunc: jest.fn()
    };

    render(<Cursors {...props} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(props.searchFunc).toHaveBeenCalledWith({
      q: 'test',
      per_page: 10,
      virtual_hosts: props.pageState.currParams.virtual_hosts,
      sort: props.pageState.currParams.sort,
      cursor: 'prevCursor'
    }, 1);
  });
});



describe('App Component Full Test Suite', () => {
  beforeEach(() => {
    // Reset mocks before each test
    axios.get.mockReset();
  });

  it('renders initial app state', () => {
    render(<App />);

    // Check for title
    const titleElement = screen.getByText(/Censys Search/i);
    expect(titleElement).toBeInTheDocument();

    // Check for SearchBar
    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();

    // Check for Result List (should be empty right now)
    const resultList = screen.getByTestId("result-list");
    expect(resultList).toBeInTheDocument();


    // Check for cursors (should be empty right now)
    const cursors = screen.getByTestId("cursors");
    expect(cursors).toBeInTheDocument();
  });



  it('initiates and displays results from a successful search', async () => {
    // Mock a successful API response
    axios.get.mockResolvedValueOnce({
      data: {
        code: 200,
        status: "OK",
        result: {
          query: "services.service_name: HTTP",
          total: 379020315,
          duration: 2860,
          hits: [
            {
              ip: "0.0.0.1",
              services: [
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.2",
              services: [
                { type: "HTTP" },
                { type: "HTTP" },
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.3",
              services: [
                { type: "HTTP" },
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.4",
              services: [
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.5",
              services: [
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.6",
              services: [
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.7",
              services: [
                { type: "HTTP" },
                { type: "HTTP" },
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.8",
              services: [
                { type: "HTTP" },
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.9",
              services: [
                { type: "HTTP" }
              ]
            }, {
              ip: "0.0.0.10",
              services: [
                { type: "HTTP" },
                { type: "HTTP" }
              ]
            }
          ],
          links: {
            next: "eyJhbGciOiJFZERTQSJ9.eyJub25jZSI6IlkvWkE2RWsxd0Y2WGhQNDlrM0RZWUhESDBWRWh5QnRPQTJUWms4Y3JNNTgiLCJwYWdlIjoyLCJyZXZlcnNlZCI6ZmFsc2UsInNlYXJjaF9hZnRlciI6WzAuMzE4ODI5OTUsMTcwODYzNTU4MzI5MCwiOTEuNi4xNTQuMTU0IixudWxsXSwic29ydCI6W3siX3Njb3JlIjp7Im9yZGVyIjoiZGVzYyJ9fSx7Imxhc3RfdXBkYXRlZF9hdCI6eyJtaXNzaW5nIjoiX2xhc3QiLCJtb2RlIjoibWluIiwib3JkZXIiOiJkZXNjIn19LHsiaXAiOnsibWlzc2luZyI6Il9sYXN0IiwibW9kZSI6Im1pbiIsIm9yZGVyIjoiYXNjIn19LHsibmFtZS5fX3JhdyI6eyJtaXNzaW5nIjoiX2xhc3QiLCJtb2RlIjoibWluIiwib3JkZXIiOiJhc2MifX1dLCJ2ZXJzaW9uIjoxfQ.yo41Ech-hnuB4-DN3kDksEPtUZQhXTVoMqYX8DWm-FCimsMRL5vhKnP1TW73FBhmG75vbpm93cx48HsOmRjqAw",
            prev: ""
          }
        }
      }
    });

    // Render the App component and simulate user input and search button click
    const { getByPlaceholderText, getByText } = render(<App />);
    fireEvent.change(getByPlaceholderText('Enter Plaintext Query'), { target: { value: 'test query' } });
    fireEvent.click(getByText('Search'));

    await waitFor(() => {
      // Verify results are displayed
      for (let i = 1; i <= 10; i++) {
        const id = "result-item:0.0.0." + i.toString();
        expect(screen.getByTestId(id)).toBeInTheDocument();
      }

    });
  });

  it('displays an error message when the search fails', async () => {
    // Mock an API error response
    axios.get.mockRejectedValueOnce({
      response: {
        data: {
          code: 422,
          status: "ERROR",
          error: "Invalid Query"
        }
      }
    });

    // Render and simulate a search
    const { getByPlaceholderText, getByText } = render(<App />);
    fireEvent.change(getByPlaceholderText('Enter Plaintext Query'), { target: { value: 'test query' } });
    fireEvent.click(getByText('Search'));

    await waitFor(() => {
      // Verify error message is displayed
      expect(getByText('Error Fetching Results...')).toBeInTheDocument();
    });
  });

  // Include additional tests as necessary for pagination, empty states, etc.
});

