import './styles/Cursor.css'

export default function Cursors(props) {

    const prev = props.pageState.cursors.prev;
    const next = props.pageState.cursors.next;

    const currParams = props.pageState.currParams;
    const currPageNum = props.pageState.pageNum;

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
        <div className="cursor-div" data-testid="cursors">
            {prevButton}
            {nextButton}
        </div>
    );
}