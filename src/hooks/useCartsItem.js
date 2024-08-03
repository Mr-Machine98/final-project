import { useDispatch, useSelector } from "react-redux";
import { onAddProductCart, onDeleteProductCart, onDeleteState, onMinusProductCart, onUpdateProductCart } from "../redux/slices/buyItem/buyItemSlice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});


export function useCartsItem() {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.buyItems);
    const [total, setTotal] = useState(0);

    const handlerAddProductCart = (item) => {
        Toast.fire({
            icon: "success",
            title: `Agregando al carrito: ${item.product.name}, ${item.product.model}.`
        });

        let existItemCart = cartItems.some(i => i.product.id == item.product.id );

        if (existItemCart) dispatch(onUpdateProductCart(item.product));
        else dispatch(onAddProductCart(item.product));    
    };

    const handlerFlushStateCartItems = () => {
        dispatch(onDeleteState());
    }

    const handlerMinusProductCart = (product) => {
        dispatch(onMinusProductCart(product));
    };

    const handlerDeleteProductCart = (product) => {
        dispatch(onDeleteProductCart(product));
    }

    useEffect(() => {
        let total = 0
        cartItems.forEach(e => {
            total = total + Number(e.subTotal);
        });
        setTotal(total);
        sessionStorage.setItem('cart', JSON.stringify(cartItems) );
    }, [cartItems]);

    return {
        handlerAddProductCart,
        handlerMinusProductCart,
        handlerDeleteProductCart,
        handlerFlushStateCartItems,
        cartItems,
        total
    };
}