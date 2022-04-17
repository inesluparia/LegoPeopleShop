
<script>
    export let filterfunction;
</script>

<div class="dropdown">
<button class="dropbtn">Sort and Filter</button>
<div class="dropdown-content">
    <!-- <a href="#">Price +</a>
    <a href="#">Year +</a>
    <a on:click={filterfunction("name")} href="#">Name +</a>
    <a href="#">Classics +</a>
    <a href="#">Vintage +</a>
    <a href="#">Uniformed +</a> -->
    <span on:click={filterfunction("name")} >Name +</span>
    <span on:click={filterfunction("price")} >Price +</span>
    <span on:click={filterfunction("year")} >Year +</span>
    <span on:click={filterfunction("classic")} >Classics +</span>
    <span on:click={filterfunction("vintage")} >Vintage +</span>
    <span on:click={filterfunction("uniformed")} >Uniformed +</span>
    <span on:click={filterfunction("reset")} >Reset +</span>

</div>
</div>

<style>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: #d40000;
    color: white;
    padding: 10px;
    width: 200px;
    border: none;
    cursor: pointer;
    margin:0;
}


/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    width: 200px;
    display: none;
    position: absolute;
    text-align: right;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content span {
    background-color: #d40000;
    color: white;
    padding: 12px 10px;
    text-decoration: none;
    display: block;
}

.dropdown-content span:hover {
    /* background-color: #f1f1f1 */
    font-weight: bolder;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    font-weight: bold;
    text-align: end;
}
</style>  