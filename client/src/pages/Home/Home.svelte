<script>
    import Header from "./Header.svelte";
    import Categories from "./CategoryWrapper.svelte"
    import Footer from "../../components/Footer.svelte"

</script>

<main>
<Header />
<Categories />
<Footer></Footer>
</main>

<style>
    main {
        display: block;
        justify-content: space-between;
        margin-left:20%;
        margin-right:20%;
		min-height: calc(100vh - 60px);

    }

</style>

