import './styles/Results.css'


function Result(props) {


    const testId = "result-item:" + props.ip;
    return (
        <div className="result-div" data-testid={testId}>
            <h4 data-testid="result-item">IP Address: {props.ip}</h4>
            <h4>Number of Protocols: {props.services.length}</h4>
        </div>
    );
}

export default Result;