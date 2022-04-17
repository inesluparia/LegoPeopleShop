import { writable, derived } from "svelte/store"

export const cartItems = writable([])

export const total = derived(cartItems, $cartItems => {
    let totalPrice = 0;
    $cartItems.forEach(i => totalPrice = totalPrice + parseInt(i.price) )
    return totalPrice
    });       
        
export const user_favs = writable([])