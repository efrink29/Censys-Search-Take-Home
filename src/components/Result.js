import './styles/Results.css'


function Result(props) {



    return (
        <div className="result-div">
            <h4>IP Address: {props.ip}</h4>
            <h4>Number of Protocols: {props.services.length}</h4>
        </div>
    );
}

export default Result;