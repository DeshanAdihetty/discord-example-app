<script>
import { page } from '$app/stores';  

var id = null;
function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, );
  function frame() {
    elem.style.opacity= 100
    if (pos == 3000) {
      clearInterval(id);
    } else {
      pos++;
      
      elem.style.right = pos + 'px';
    }
  }
}
</script>
<nav class="bg-white border-gray-200 dark:bg-zinc-900">
    <img id = "myAnimation" class="absolute opacity-0 z-10 pointer-events-none" src= "https://cdn.discordapp.com/attachments/922736141936001076/1161619687482871920/reynabeast.gif?ex=6538f5a3&is=652680a3&hm=17910dfcf27c01bcee4e432b992bcf5f708b8105c986a14bda350dbd7c4d1703&"/>
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
      <div  class="flex items-center">
          <img src="https://cdn.discordapp.com/avatars/1102232417307205632/cd594f57f17a76aa9ac04bbc38de23c5.png" class="h-20 mr-6 rounded-full" alt="Flowbite Logo" on:click={myMove} />
          <span class="self-center text-5xl font-semibold whitespace-nowrap dark:text-white"> P3R.CY'S LAB</span>
      </div>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
       
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-zinc-900 dark:border-gray-700">
          
          <li>
            {#if $page.url.pathname == '/'}
            <a href="/" class=" text-2xl last:block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
            {:else}
            <a href="/" class=" text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
            {/if}
          </li>
          <li>
            {#if $page.url.pathname == '/Gym'}
            <a href="/Gym" class=" text-2xl last:block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Gym</a>
            {:else}
            <a href="/Gym" class=" text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gym</a>
            {/if}
          </li>
          <li>
            {#if $page.url.pathname == '/CatPics'}
            <a href="/CatPics" class=" text-2xl last:block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Cat Pics</a>
            {:else}
            <a href="/CatPics" class=" text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cat Pics</a>
            {/if}
          </li>

        </ul>
      </div>
    </div>
  </nav>