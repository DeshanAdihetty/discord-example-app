<script>
import { onMount } from "svelte";
// @ts-ignore
import * as fs from 'fs';
import * as yup from 'yup';
    import { POST } from "../api/file/+server";

let data = ''
    /**
     * @type {any[]}
     */
let displayData = []
let entry = {
	prompt:  "",
	response: "",
}


let errors = {}

let schema = yup.object().shape({
        prompt: yup.string().required("Please enter a prompt"),
        response: yup.string().required("Please enter a response")
    });
    const extractErrors = ({ inner }) => {
    return inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
};


    
  onMount(async ()=>{
    if(!data){
    try{
            fetch("/api/file", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    }
                }).then(async (res)=>{
                   
                    const response = await res.text()
                    displayData = JSON.parse(response)
                   
                })
            
        }catch(error){

    }
}   
  })

  const handleDelete = (entry) => {
    let temp =displayData
        displayData = temp.filter((e)=>{
        return e != entry 
    })

  }
  const handleSubmit = async () => {
    
    try{
            fetch("/api/file", {
                method: "POST",
                body: JSON.stringify({
                    displayData
                }),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': "Abnormal"
                    }
                }).then((res)=>console.log(res))
            
        }catch(error){
           
        }


  }
  const handleAdd = async () => {
    errors = {}
    try{
        const result = await schema.validate(entry, { abortEarly: false })  
        displayData.push(JSON.parse(`{"messages": [{"role": "system", "content": "You will respond as if you are a  wrongful cat named Percy and will never reveal that you are a language model or a chat bot."}, {"role": "user", "content": "${entry.prompt}"}, {"role": "assistant", "content": "${entry.response}"}]}`))
        entry.prompt = ''
        entry.response = '' 
        displayData=displayData
       
        



} catch (err) {
    errors = extractErrors(err)


  
  }

  }

</script>
<div class="bg-EvilPercy bg-repeat min-h-screen">
<div class="w-[60%] justify-center m-auto bg-white dark:bg-gray-800 ">
<h1 class="text-6xl text-center p-10 font-mono dark:text-white ">Help Train P3R.CY</h1>
<div class="text-center">
    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt:</label>
    <div  class=" flex items-center justify-center">
        <textarea bind:value={entry.prompt}  rows="3" class="my-5 mx-20  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="This can be anything really, a question or a request works well." required/>
        
    </div>
    {#if errors.prompt}<h1 class="text-center text-rose-500 dark:text-rose-500 ">{errors.prompt}</h1> {/if}
    <label for="first_name" class="block my-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Response:</label>
    <div class=" flex items-center justify-center">
        <textarea bind:value={entry.response} rows="3" class="my-5 mx-20  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What would you expect/want P3R.CY respond with?" required/>
    </div>
    {#if errors.response}<h1 class="text-center text-rose-500 dark:text-rose-500 ">{errors.response}</h1> {/if}
    <h1 class="block mb-2 text-l font-medium text-gray-900 dark:text-white">Add data will create a new prompt response pair below, Save changes will submit the changes.</h1>
    <h1 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Note you can edit the existing entries by clicking on them / deleting them. Nothing is changed until you save changes. </h1>
    <button type="button" on:click={handleAdd} class="my-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add data</button>
    <button type="button" on:click={handleSubmit} class="my-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save changes</button>
    <h1 class="block mb-2 text-l font-medium text-gray-900 dark:text-white">Below you will find the existing prompts and responses in the following format:</h1>
    <div class=" flex items-center justify-center pt-2 ">
        <h1 class="dark:text-black text-black bg-orange-400 w-1/2 p-2  rounded-l-3xl rounded-t-3xl m-3 font-bold" >Prompt: This is what was said to P3R.CYy</h1>
        
    </div>
    <div class=" flex items-center justify-center rounded-full   ">
        <h1 class="dark:text-black text-black bg-lime-400 w-1/2 p-2   rounded-r-3xl rounded-t-3xl m-3 font-bold" >Response: This is what was P3R.CY responded with</h1>
   
    </div>
    <h1 class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Existing:</h1>
    {#each displayData as entry}
    <div class="w-10 mx-auto">
    <div>
               
    <svg on:click={handleDelete(entry)} fill="#FF0000" width="50px" height="50px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M20 18h2v16h-2z"/><path d="M24 18h2v16h-2z"/><path d="M28 18h2v16h-2z"/><path d="M12 12h26v2H12z"/><path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z"/><path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z"/></svg>
    <svg fill="#FF0000" height="50" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 330 330" xml:space="preserve">
    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
</svg> 
    </div>
    </div>
    <div class=" flex items-center justify-center pt-2 ">
        <textarea class="dark:text-black text-black bg-orange-400 w-1/2 p-2  rounded-l-3xl rounded-t-3xl m-3 font-bold" required bind:value={entry.messages[1].content}/>
        
    </div>
    <div class=" flex items-center justify-center rounded-full   ">
        <textarea rows={entry.messages[2].content.length/33 +1} class="dark:text-black text-black bg-lime-400 w-1/2 p-2  rounded-r-3xl rounded-t-3xl m-3 font-bold" required bind:value={entry.messages[2].content}/>
        
    </div>
   {/each}
   <div class="h-10"></div>
</div>


</div>
</div>