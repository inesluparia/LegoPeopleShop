<script>
    import { cartItems, total } from "../../stores/shoppingCart.js"
    import { user } from "../../stores/authStore"
    import { onMount } from "svelte"
    import { navigate } from "svelte-navigator"

    import { getNotificationsContext } from "svelte-notifications"
    const { addNotification } = getNotificationsContext()

    onMount(async () => {
        const response = await fetch(`/api/${$user.userId}/cartitems`)
        const { data: d } = await response.json()
        cartItems.set(d)
    })

    function removeItem(id) {
        cartItems.update((olditems) => {
            const newItems = olditems.filter((i) => i.id != id)
            return newItems
        });
        try {
            fetch(`/api/${$user.userId}/cartitems/${id}`, {
                method: "DELETE",
            });
        } catch (e) {
            console.error(e)
        }
    }
</script>

<div id="wrapper-div">
    <h1>Hello {$user.name}!</h1>
    
    {#if $cartItems.length}
    <h2>Shopping cart</h2>
        <table>
            {#each $cartItems as item}
                <tr>
                    <td id="remove" on:click={removeItem(item.id)}>X</td>
                    <td><img src="/images/{item.img}" alt="" /></td>
                    <td>{item.name}</td>
                    <td>{item.price} kr.</td>
                </tr>
            {/each}
            <tr>
                <td />
                <td />
                <td style="text-align: right">TOTAL </td>
                <td>{$total} kr.</td>
            </tr>
        </table>
        <div id="buttons-wrapper">
            <button
                on:click={() =>
                    addNotification({
                        text: "Feature coming soon!",
                        removeAfter: 2500,
                        position: "top-center",
                        type: "success",
                    })}>Check out</button
            >
            <button on:click={() => navigate("/shop")}>Continue Shopping</button>
        </div>
    {:else}
        <h2>Your shopping cart is empty</h2>

        <button on:click={() => navigate("/shop")}>Start shopping!</button>
    {/if}
</div>

<style>
    #buttons-wrapper {
        display: flex;
        justify-content: space-between;
    }
    button {
        display: inline;
        margin: 20px;
        width: 40%;
        background-color: rgb(37, 37, 199);
        color: white;
        font-size: smaller;
        padding: 0.5rem;
    }
    button:hover,
    button:focus {
        filter: brightness(130%);
        outline: none;
    }
    img {
        padding: 5px;
        width: 50px;
    }
    #wrapper-div {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    #remove {
        cursor: pointer;
        font-weight: bold;
    }
    #remove:hover {
        color: rgb(255, 208, 0);
    }
</style>
