<script>
    import Item from "./Item.svelte"
    import Filter from "./Filter.svelte"
    export let items
    export let itemClick;
    export let addToCartClick;

    $: itemsToDisplay = [...items]
    //hot key values to hold state for sorting - 1=> true or ascending
    let itemsState = { name : 1, price : 1, year : 1 }
    function itemfilter(type) {
        switch (type){
            case "name": {
                if (itemsState.name) {
                    itemsToDisplay = itemsToDisplay.sort((a, b) => a.name.localeCompare(b.name))
                    itemsState.name = !itemsState.name
                } else {
                    itemsToDisplay = itemsToDisplay.reverse()
                    itemsState.name = !itemsState.name
                }
            } break
            case "price": {
                if (itemsState.price) {
                    itemsToDisplay = itemsToDisplay.sort((a, b) => a.price - b.price)
                    itemsState.price = !itemsState.price    
                } else {
                    itemsToDisplay = itemsToDisplay.reverse()
                    itemsState.price = !itemsState.price    
                }
            } break
            case "year": {
                if (itemsState.year) {
                    itemsToDisplay = itemsToDisplay.sort((a, b) => a.year - b.year)
                    itemsState.year = !itemsState.year  
                } else {
                    itemsToDisplay = itemsToDisplay.reverse()
                    itemsState.year = !itemsState.year  
                }
             } break
            case "classic": {
                itemsToDisplay =  items.filter( i => i.category === "Classic")
            } break
            case "vintage": {
                itemsToDisplay =  items.filter( i => i.category === "Vintage")
            } break
            case "uniformed": {
                itemsToDisplay =  items.filter( i => i.category === "Uniformed")
            } break
            case "reset": {
                itemsToDisplay = items
            }
            default:
                console.log("error 4")
        }
    }

</script>

<div>
    <div id="filter">
        <p>
            <Filter filterfunction={itemfilter} />
        </p>
    </div>
    <div id="items-container">
        {#each itemsToDisplay as item }
            <Item itemClick={itemClick} addToCartClick={addToCartClick} name={item.name} id={item.id} price={item.price} img={item.img}/>
        {/each}
    </div>
</div>

<style>
    #items-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    p {
        text-align: end;
    }
</style>