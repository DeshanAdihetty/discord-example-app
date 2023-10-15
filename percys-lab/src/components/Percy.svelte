
<script lang="ts">
    import { onMount } from 'svelte';
     
     onMount(() => {
        const anchor = document.getElementById('head')
        const rekt = anchor?.getBoundingClientRect()
        const anchorX = rekt?.left + rekt?.width/2
        const anchorY = rekt?.top + rekt?.height/2
        
        document.addEventListener('mousemove', (e) =>{
        const mouseX = e.clientX;
        const mouseY = e.clientY
        let left = document.getElementById('leftpupil') as HTMLElement
        const x = mouseX>anchorX ? '3px' : mouseX-anchorX<30 && mouseX-anchorX>-30 ? '0px' : "-4px" 
        const y = mouseY>anchorY ? '5px' : mouseY-anchorY<60 && mouseY-anchorY>-30 ? '0px' : "-5px" 
        left.style.transform = `translate(${x},${y})`
        let right = document.getElementById('rightpupil') as HTMLElement 
        right.style.transform = `translate(${x},${y})`
        
        
        
    })
     });
    let show = false 
    const handlePercy = () =>{
        show = !show
    }
    
    
    
    
    
    
    </script>
    {#if show == true}
    <div class="bg-[white] absolute z-20 -left-[130px] top-[60px] p-2 speech-bubble" >

        <h1 class="text-[19]">Buy the Percy Pass™&nbsp&nbsp</h1>
    </div>
        {/if}
    <div id="box">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="cat" on:click={handlePercy}>
          <div id=head class="head">
            <div class="ears">
              <div class="ear left"></div>
              <div class="ear right"></div>
            </div>
            <div class="eyes">
              <div  class="eye left">
                <div id="leftpupil" class="pupil"></div>
            </div>
              
              <div class="eye right">
                <div id="rightpupil" class="pupil"></div>
              </div>
            </div>
            <div class="muzzle">
              <div class="nose"></div>
            </div>
          </div>
          <div class="body">
            <div class="paw"></div>
          </div>
          <div class="tail">
            <div class="tail-segment">
              <div class="tail-segment">
                <div class="tail-segment">
                  <div class="tail-segment">
                    <div class="tail-segment">
                      <div class="tail-segment">
                         <div class="tail-segment">
                          <div class="tail-segment">
                            <div class="tail-segment">
                              <div class="tail-segment">
                                <div class="tail-segment">
                                  <div class="tail-segment">
                                    <div class="tail-segment">
                                      <div class="tail-segment">
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    