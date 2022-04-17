<style>
    button {
        background-color: rgb(37, 37, 199);
        color:white;
        margin: 0;
        padding: 1rem;
    }

    button:hover,
    button:focus {
        filter: brightness(115%);
        outline: none;
    }
</style>

<button><slot /></button>