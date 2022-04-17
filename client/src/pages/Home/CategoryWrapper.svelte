<script>
    import Category from "./Category.svelte"
    import categories from "../../stores/categories"
    
</script>
<div id="container">
    <h2>Shop By Categories</h2>
    <div id="flex-container">
        {#each categories as c}
        <Category image={c.image} category={c.name}></Category>
        {/each}
    </div>
</div>
<style>
    #container {
        padding: 5%;
    }
    h2 {    
        text-align: left;
    }
    #flex-container {
        display: flex;
        justify-content: space-around;
    }
</style>