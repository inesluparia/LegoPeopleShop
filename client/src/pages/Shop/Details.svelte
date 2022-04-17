<script>
    export let name = ""
    export let category =""
    export let year = ""
    export let price = ""
    export let img = "wizard.jpg"
    export let id = ""
    export let isFav = false;
    export let addToCartClick;
    function addToCart() {}

</script>

<div id="wrapper">
    <span id="heart">{isFav ? '🖤' : '🤍'}</span>
    <div id="img-container">
        <img src="/images/{img}" alt={name} />
    </div>
    <h2>{name}</h2>
    <span>{price} kr.</span>
    <p>Year: {year} <br>Category: {category}</p>
    <button on:click|preventDefault={addToCartClick(id)}>Add to Cart</button>
</div>

<style>
    
    #img-container {
        width: 400px;
        height: 400px;
        overflow: hidden;
        margin:auto;
    }
      
    img {
        width: 400px;
        -webkit-transition: 0.5s ease-in-out;
        transition: 0.5s ease-in-out;
        cursor: pointer;
    }
    img:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    #wrapper {
        text-align: center;
        background-color: rgb(255, 255, 255);
        padding: 5%;
        position: relative;
    }

    button {
        width: 300px;
        background-color: rgb(37, 37, 199);
        color: white;
        margin: 0;
        padding: 0.8rem;
    }

    button:hover,
    button:focus {
        filter: brightness(130%);
        outline: none;
    }

    #heart {
        font-size: x-large;
        position: absolute;
        top: 30px;
        right: 30px;
        /* z-index: 1; */
        cursor: pointer;
    }

    span {
        font-size: larger;
        font-weight: bold;
    }
</style>
