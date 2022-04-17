<script>
import Details from "./Details.svelte"
import ItemsWrapper from "./ItemsWrapper.svelte"
import { onMount } from 'svelte'
import { isAuthenticated, user } from "../../stores/authStore";
import { getNotificationsContext } from "svelte-notifications";
const { addNotification } = getNotificationsContext();

let items = []
$:detailItem = items[5]

onMount(async () => {
  const response = await fetch(`/api/items`)
  const { data:d } = await response.json()
  items = d
});

function handleItemClick(id) {
  const newItem = items.find((item) => item.id === id)
  detailItem = newItem
}

function addItemToCart(id) {
      if (!$isAuthenticated) {
          addNotification({
              text: "Please log in to fill the cart.",
              removeAfter: 3000,
              position: "top-center",
              type: "warning",
          });
      } else {
          try {
              fetch(`/api/${$user.userId}/cartitems/`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      itemId: id,
                  }),
              });
          } catch (e) {
              console.log(err);
              error = err;
              alert(err.message);
          }

          addNotification({
              text: "Item added to the cart.",
              removeAfter: 3000,
              position: "top-center",
              type: "warning",
          });
      }
  }

</script>

<div id="flex-container">
  <div id="flex-children">
    <Details {...detailItem} addToCartClick={addItemToCart}></Details>

  </div>
  <div id="flex-children">
    <ItemsWrapper items={items} itemClick={handleItemClick} addToCartClick={addItemToCart}/>
  </div>
 
</div>

<style>
  #flex-container{
    display: flex;
    justify-content: space-around;
  }
  #flex-children {
    width: 42%;
  }
</style>