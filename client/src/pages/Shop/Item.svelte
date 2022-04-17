<script>
    export let name;
    export let price;
    export let img;
    export let id;

    export let addToCartClick;
    export let itemClick;
    export let isFav = false;
    
</script>

<div id="wrapper">
    <span id="heart">{isFav ? "🖤" : ""}</span>
    <div id="img-container" on:click|preventDefault={itemClick(id)}>
        <img src="/images/{img}" alt={name} />
    </div>
    <p>
        {name}
        <br />{price} kr.
    </p>
    <button id="item-button" on:click|preventDefault={addToCartClick(id)}>Add to Cart</button>
</div>

<style>
    #wrapper {
        background-color: rgb(255, 255, 255);
        margin: 1%;
        position: relative;
        width: 150px;
    }

    #img-container {
        width: 150px;
        height: 150px;
        overflow: hidden;
    }
    img {
        width: 150px;
        -webkit-transition: 0.3s ease-in-out;
        transition: 0.3s ease-in-out;
        cursor: pointer;

    }
    img:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
    }
    button {
        width: 150px;
        background-color: rgb(37, 37, 199);
        color: white;
        font-size: smaller;
        margin: 0;
        padding: 0.5rem;
        cursor: pointer;
    }

    button:hover,
    button:focus {
        filter: brightness(130%);
        outline: none;
    }

    #heart {
        position: absolute;
        top: 12px;
        right: 12px;
        cursor: pointer;
        /* z-index: 1; */
    }
</style>
