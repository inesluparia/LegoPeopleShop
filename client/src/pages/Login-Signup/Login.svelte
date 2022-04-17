<script>
    import { isAuthenticated, user } from "../../stores/authStore";
    import { navigate } from "svelte-navigator";
    let error = "";
    let email = "";
    let password = "";
    let regName = "";
    let regEmail = "";
    let regPassword = "";
    let confPassword = "";
    let regError = "";

    import { getNotificationsContext } from "svelte-notifications";
    const { addNotification } = getNotificationsContext();

    async function login() {
        await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((body) => {
                        addNotification({
                            text: body.message,
                            removeAfter: 3000,
                            position: "top-center",
                            type: "danger",
                        });
                    });
                } else {
                    return res.json().then((jsonUser) => {
                        user.set(jsonUser);
                        isAuthenticated.set(true);
                        navigate("/cart");
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                error = err;
                alert(err.message);
            });
    }

    async function signup() {
        const newUser = await fetch("/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                regName,
                regEmail,
                regPassword,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((body) => {
                        addNotification({
                            text: body.message,
                            removeAfter: 3000,
                            position: "top-center",
                            type: "danger",
                        });
                    });
                } else {
                    return response.json();
                }
            })
            .catch((err) => {
                console.log(err);
                error = err;
                alert(err.message);
            });

        if (newUser !== undefined) {
            user.set({
                name: newUser.name,
                userId: newUser.userId,
            });

            isAuthenticated.set(true);

            try {
                fetch("/mailer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        regEmail,
                    }),
                });
            } catch (e) {
                console.error(e);
            }

            regName = "";
            regEmail = "";
            regPassword = "";
            confPassword = "";

            navigate("/cart");
        }
    }

    function checkPasswords() {
        regError = regPassword !== confPassword ? "Passwords do not match" : "";
    }
</script>

<div id="flex-container">
    <div class="flex-children">
        <h2>Log in</h2>
        <form on:submit|preventDefault={login}>
            <div>
                <label for="email">Email</label>
                <input type="email" bind:value={email} />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" bind:value={password} />
            </div>

            <button type="submit">Submit</button>
            <div class="error-message">
                <small>{error}</small>
            </div>
        </form>
    </div>
    <div class="flex-children">
        <h2>Or sign up</h2>
        <form autocomplete="off" on:submit|preventDefault={signup}>
            <input
                autocomplete="false"
                name="hidden"
                type="text"
                style="display:none;"
            />
            <div>
                <label for="name">Name</label>
                <input type="name" bind:value={regName} />
            </div>
            <div>
                <label for="email">Email</label>
                <input
                    type="email"
                    bind:value={regEmail}
                    aautocomplete="new-password"
                />
            </div>
            <div>
                <label for="password">Password</label>
                <input
                    on:keyup={checkPasswords}
                    type="password"
                    bind:value={regPassword}
                    autocomplete="new-password"
                />
            </div>
            <div>
                <label for="password">Password confirmation</label>
                <input
                    on:keyup={checkPasswords}
                    type="password"
                    bind:value={confPassword}
                    autocomplete="new-password"
                />
            </div>
            <div class="error-message">
                <small>{regError}</small>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</div>

<style>
    #flex-container {
        display: flex;
        justify-content: center;
    }

    .flex-children {
        margin: 5% 10%;
    }

    .error-message {
        color: red;
    }
</style>
