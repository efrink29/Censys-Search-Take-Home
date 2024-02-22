import './styles/Results.css'


function ResultList(results, status) {

    if (status === "LOADING") {
        return (
            <h2>Loading Results...</h2>
        );
    }
    if (status === "ERROR") {
        return (
            <h2>Error Fetching Results...</h2>
        );
    }

    return (
        <div className="result-list">

        </div>
    );
}

export default ResultList;