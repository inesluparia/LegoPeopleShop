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
			<!-- USE THIS SYNTAX TO ADD STYLES -->
			<!-- <a href='/' class='link' use:Link>EXTRA</a> -->
			<!-- <a id="logo" class="link" href="/" use:Link>LEGO PEOPLE</a> -->

			<div id="logo">
				<Link class="link" to="/">LEGO PEOPLE</Link>
			</div>
			<div>
				<Link to="/">Home</Link>
			</div>
			<div>
				<Link to="/shop">Shop</Link>
			</div>
			<div>
				<LegoHeadSvg />
				{#if $isAuthenticated}
					<a class="nav-link" href="/" on:click={logout}>Log Out</a>
				{:else}
					<Link to="/login">Log in</Link>
				{/if}
			</div>
			<div on:click={()=> {
				if ($isAuthenticated) navigate("/cart")
				else alert("Please log in to fill your cart!")
			}}> 
				<CartSvg />	Cart
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
		width: 100%;
		padding: 1.5rem;
		display: flex;
		justify-content: space-between;
		text-align: justify;
		text-decoration: none;
	}
	nav > div {
		margin: 0px 30px 0px 30px;
		cursor:pointer;
	}
	#logo {
		width: 20px;
		font-size: larger;
		font-weight: bolder;
	}
	 	
</style>
