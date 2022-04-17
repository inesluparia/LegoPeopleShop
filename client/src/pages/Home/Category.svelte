<script>
    export let category
    export let image
    import { navigate } from "svelte-navigator";
</script>

<div id="wrapper" on:click={() => navigate("/shop")}>
    <!-- //evt make it /shop/categories/{category.id} -->
    <div id="img-container">
        <img src={image} alt="" >
    </div>
    
    <h3>{category}</h3>
</div>

<style>
    #wrapper {
        padding: 2%;
        cursor: pointer;
    }
    #img-container {
        width: 200px;
        height: 200px;
        overflow: hidden;
    }
    
    img {
        width: 200px;
    	-webkit-transition: .3s ease-in-out;
	    transition: .3s ease-in-out;

    }
    img:hover {
        -webkit-transform: scale(1.15);
        transform: scale(1.15);
    }


    h3 {
        text-align: center;
    }
        
</style>