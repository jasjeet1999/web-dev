const initialState = {
    data:[]
};

const reducer = (state = initialState,action) =>
switch (action.type){
    case "updateMovies": 
    state.data = action.data;
    return{
        ...state
    }
    default:
        return{
            ...state
        }
}
export default reducer;