import { createSlice } from "@reduxjs/toolkit";

const initalBuy = JSON.parse(sessionStorage.getItem('cart')) || [];

export const buyItemSlice = createSlice({
    name: "buyItems",
    initialState: initalBuy,
    reducers: {
        onAddProductCart: (state, action) => {
            state.push({
                product: action.payload,
                quantity: 1,
                subTotal: Number(action.payload.price)
            });
        },

        onUpdateProductCart: (state, action) => {
            return state.map(i => {
                if (i.product.id == action.payload.id) {
                    const q = Number(i.quantity) + 1;
                    return {
                        ...i,
                        quantity: q,
                        subTotal: q * Number(action.payload.price)
                    }
                }
                return i;
            });
        },

        onMinusProductCart: (state, action) => {
            return state.map(i => {
                if (i.product.id == action.payload.id) {
                    const q = Number(i.quantity) - 1;
                    return {
                        ...i,
                        quantity: q,
                        subTotal: q * Number(action.payload.price)
                    }
                }
                return i;
            });
        },

        onDeleteProductCart: (state, action) => {
            return state.filter(i => i.product.id != action.payload.id);
        },

        onDeleteState: () => {
            return [];
        }
    }
});

export const { onAddProductCart, onMinusProductCart, onUpdateProductCart, onDeleteProductCart, onDeleteState } = buyItemSlice.actions;