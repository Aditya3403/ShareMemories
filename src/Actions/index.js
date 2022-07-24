export const incNumber = (x) =>{
    return{
        type:"INCREMENT",
        payload:x,
    }
}
export const decNumber = () =>{
    return{
        type:"DECREMENT"
    }
}