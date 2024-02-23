import './styles/Cursor.css'

export default function Cursors(props) {

    const prev = props.cursors[0];
    const next = props.cursors[1];

    const currParams = props.currParams;
    const currPageNum = props.pageNum;

    var prevButton = <></>
    var nextButton = <></>

    function getPrev() {
        var params = {
            q: currParams.q,
            per_page: currParams.per_page,
            virtual_hosts: currParams.virtual_hosts,
            sort: currParams.sort,
            cursor: prev
        };
        if (currPageNum === 1) {
            params.cursor = "";
        }


        props.searchFunc(params, currPageNum - 1)
    }

    function getNext() {
        const params = {
            q: currParams.q,
            per_page: currParams.per_page,
            virtual_hosts: currParams.virtual_hosts,
            sort: currParams.sort,
            cursor: next
        };

        props.searchFunc(params, currPageNum + 1)
    }

    if (prev.length !== 0) {
        prevButton = <button onClick={getPrev}>Previous</button>
    }
    if (next.length !== 0) {
        nextButton = <button onClick={getNext}>Next</button>
    }

    return (
        <div className="cursor-div">
            {prevButton}
            {nextButton}
        </div>
    );
}