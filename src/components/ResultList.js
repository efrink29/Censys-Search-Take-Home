import Result from './Result';
import './styles/Results.css'


function ResultList(props) {
    const status = props.status;
    const results = props.results;
    const message = props.message;
    const pageNum = props.pageNum;
    const perPage = props.perPage;

    if (status === "LOADING") {
        return (
            <div className="result-list">
                <h2>Loading Results...</h2>
            </div>

        );
    }
    if (status === "ERROR") {
        return (
            <div className="result-list">
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
            <div className="result-list">
                {listItems}
            </div>
        );
    }

}

export default ResultList;