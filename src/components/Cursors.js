import './styles/Cursor.css'

function Cursors(props) {

    const prev = props.pageState.cursors.prev;
    const next = props.pageState.cursors.next;

    const currParams = props.pageState.search_params;
    const currPageNum = props.pageState.pageNum;

    // Check if prev and next cursors are present otherwise adds empty tag (no button)
    var prevButton = <></>
    var nextButton = <></>

    if (prev.length !== 0) {
        prevButton = <button onClick={getPrev}>Previous</button>
    }
    if (next.length !== 0) {
        nextButton = <button onClick={getNext}>Next</button>
    }

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

    

    return (
        <div className="cursor-div" data-testid="cursors">
            {prevButton}
            {nextButton}
        </div>
    );
}

export default Cursors;
