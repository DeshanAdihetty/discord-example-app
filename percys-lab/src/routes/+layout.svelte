
<script>
    import "../app.css";
    import Navbar from "../components/Navbar.svelte";
    import Percy from "../components/Percy.svelte";
</script>
<Navbar/>
<div class="absolute z-10 scale-[70%] -top-4 right-[50%]">
    <Percy/>
    </div>
<slot />