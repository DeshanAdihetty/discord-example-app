
<script lang='ts'>
    import Carousel from 'svelte-carousel'
    import { onMount } from "svelte";

    let data:any
    let images = []
    import { browser } from '$app/environment';

    let carousel; // for calling methods of the carousel instance

const handleNextClick = () => {
  carousel.goToNext()
}


onMount(async ()=>{
    if(!data){
    try{
            fetch("/api/pic", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    }
                }).then(async (res)=>{
                   
                    const response = await res.text()
                    data = JSON.parse(response).sort((a, b) => 0.5 - Math.random()).filter((e)=>!e.includes('.mov'))
                    

                })
            
        }catch(error){

    }
}   
  })

</script>
<div class="bg-EvilPercy bg-repeat rounded hscreen">
<div class="w-[60%] justify-center m-auto bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-100" >
<h1 class="text-6xl text-center p-10 font-mono dark:text-white">Cat Pics for Percy</h1>
{#if data && browser}
<div class="justify-center">
<div class="w-[50%] mx-auto">
<Carousel  
bind:this={carousel} 
dots={false}
autoplay
autoplayDuration={5000}
autoplayProgressVisible
pauseOnFocus

>
{#each data as img }
<img src ="{img}"/>
{/each}
</Carousel>
</div>
</div>
{/if}
<div class="h-20"></div>
</div>

</div>
