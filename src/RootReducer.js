var initialState={
    product:{}
}

export default function RootReducer(state=initialState, action){
    switch(action.type){
        case "ADD_DATA":
            state.product[action.payload[0]]= action.payload[1];
            return {product:state.product};
        case "DEL_DATA":
            delete state.product[action.payload[0]]
            console.log(state.product);
            return {product:state.product};
        default:
            return state;
    }
}