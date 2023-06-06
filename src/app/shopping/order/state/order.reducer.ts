import { createReducer, on } from "@ngrx/store";
import { OrderState, initialState } from "./order.state";
import { addLocalToState, cancelProduct, updateCount } from "./order.actions";

export const _productReducer=createReducer(initialState,on(addLocalToState,(state)=>{
    const products=  JSON.parse(localStorage.getItem('products')||'[]');
    return {
        ...state,products:[...products]
    }
}),on(updateCount,(state:OrderState,action)=>{
    console.log(state.products);
    const newCart = state.products.map((item) => {
        if (action.payload.id == item._id) {
          let price = item.price;
          let arrCopy = { ...item };
          arrCopy.count = action.payload.count;
          arrCopy.totalPrice = action.payload.count * price;
          return arrCopy;
        } else {
          return item;
        }
      });
    localStorage.setItem('products',JSON.stringify(newCart));
    return {
        ...state,products:newCart
    }
}),on(cancelProduct,(state,action)=>{

    const newCart = state.products.filter((item)=>{
        return action.id != item._id
    }).map((item) => {
        if (action.id != item._id) {
            return item;
        }
    });
    console.log(newCart);
    localStorage.setItem('products',JSON.stringify(newCart));
    return {
        ...state,newCart
    }
}));

export function orderReducer(state:any,action:any){
 
    return _productReducer(state,action);
}