import Result from './Result';
import './styles/Results.css'


function ResultList(props) {
    const status = props.pageState.status;
    const results = props.pageState.search_results;
    const message = props.pageState.message;
    const pageNum = props.pageState.pageNum;
    const perPage = props.pageState.search_params.per_page;

    if (status === "LOADING") {
        return (
            <div className="result-list" data-testid="result-list">
                <h2>Loading Results...</h2>
            </div>

        );
    }
    if (status === "ERROR") {
        return (
            <div className="result-list" data-testid="result-list">
                <h2>Error Fetching Results...</h2>
                <h3>{message}</h3>
            </div>

        );
    }

    if (status === "SUCCESS") {
        const listItems = results.map((result, i) =>
            <div className="list-item" key={pageNum * perPage + i}>{(pageNum * perPage) + i + 1}. <Result ip={result.ip} services={result.services} /></div>
        );

        return (
            <div className="result-list" data-testid="result-list">
                {listItems}
            </div>
        );
    }

    if (status === "INIT") {
        return (
            <div className="result-list" data-testid="result-list">

            </div>
        );
    }

}

export default ResultList;