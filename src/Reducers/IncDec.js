const intialState = 0;
const changeFollowers = (state = intialState,action) => {
    switch (action.type) {
        case "INCREMENT" :
            console.log(action.payload);
            console.log(state);
            state = state + action.payload;
            console.log(state);
            console.log(typeof(state));
            return state;
    
        case "DECREMENT":
            
            return (state - 1);
        default:
            return (state);
    }

}

export default changeFollowers;