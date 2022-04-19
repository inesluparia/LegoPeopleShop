<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Shop from "./pages/Shop/Shop.svelte";
	import Login from "./pages/Login-Signup/Login.svelte";
	import Home from "./pages/Home/Home.svelte";
	import Profile from "./pages/Profile/Profile.svelte";
	import Cart from "./pages/ShoppingCart/Cart.svelte";
	import { isAuthenticated, user } from "./stores/authStore";
	import Notifications from "svelte-notifications";
	import { navigate } from "svelte-navigator";
	import CartSvg from "./components/cartSVG.svelte";
	import LegoHeadSvg from "./components/legoHeadSVG.svelte";

	function logout() {
		isAuthenticated.set(false);
		user.set({});
	}
</script>

<Notifications>
	<Router>
		<nav>
			<div id="logo" class="nav-link">
				<Link to="/">LEGO PEOPLE</Link>
			</div>
			<div class="nav-link">
				<Link to="/">Home</Link>
			</div>			
			<div class="nav-link">
				<Link to="/shop">Shop</Link>
			</div>
			<div class="nav-link">
				{#if $isAuthenticated}
					<a class="nav-link" href="/" on:click={logout}>Log Out &nbsp;<LegoHeadSvg /></a>
				{:else}
					<Link to="/login">Log in &nbsp;<LegoHeadSvg /></Link>
				{/if}
			</div>
			<div class="nav-link"
			on:click={()=> {
				if ($isAuthenticated) navigate("/cart")
				else alert("Please log in to fill your cart!")
			}}
			>Cart &nbsp; <CartSvg />
			</div>
		</nav>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/login">
			<Login />
		</Route>
		<Route path="/shop">
			<Shop />
		</Route>
		<Route path="/cart">
				<Cart />			
		</Route>
		<Route path="/profile">
			<Profile />
		</Route>
		<!-- <Route path="/" component={Home} /> this syntax was making warnings about location and nav-->
	</Router>
</Notifications>

<style>
	nav {
		background-color: rgb(241, 241, 241);
		padding: 1.3rem;
		display: flex;
		justify-content: space-between;
		text-align: justify;
		text-decoration: none;
		
	}
	nav > div {
		margin: 0px 30px 0px 30px;
		cursor:pointer;
		align-self: center;
	}
	#logo {
		width: 20px;
		font-size: larger;
		font-weight: bolder;
	}
	
	.nav-link, .nav-link > :global(a) {
		text-decoration: none;
		color: rgb(0, 0, 103);
		-webkit-transition: 0.1s ease-in-out;
        transition: 0.1s ease-in-out;
		display: flex;
	}
	.nav-link:hover, .nav-link > :global(a):hover{
	  color: rgb(244, 200, 1);
	}
	
</style>
