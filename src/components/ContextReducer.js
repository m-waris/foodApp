import React, { createContext, useReducer, useContext } from 'react'

const cartStateContext = createContext();
const cartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, { id: action.id, name: action.name, price: action.price, quantity: action.quantity, size: action.size, img: action.img }];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.quantity, parseInt(action.quantity), action.price + food.price)
                    arr[index] = { ...food, quantity: parseInt(action.quantity) + food.quantity, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            return state;
    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <>
            <cartDispatchContext.Provider value={dispatch}>
                <cartStateContext.Provider value={state} >
                    {children}
                </cartStateContext.Provider>
            </cartDispatchContext.Provider>
        </>
    )
}

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
