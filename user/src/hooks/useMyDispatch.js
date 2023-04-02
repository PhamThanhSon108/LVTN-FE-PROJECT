const { useDispatch } = require('react-redux');

function useMyDispatch() {
    const dispatch = useDispatch();
    return dispatch;
}

export default useMyDispatch;
