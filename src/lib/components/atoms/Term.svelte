<script lang="ts">    
    import type {Term} from "../../../db";
    import {createEventDispatcher} from 'svelte'
import { attr } from "svelte/internal";
    export let term: Term;
    export let disabled:boolean = false;
    let open = false
    let timer;
    let detectTouch;
    let touchEndFunc;



    const dispatcher = createEventDispatcher()
    const handleClick = ()=>{
        dispatcher('toggle')
    }

    const handleOpen = ()=>{
        open=true
    }

    const handleClose = ()=>{
        open=false
    }

    const handleTouchStart =()=>{
        timer = setTimeout(()=>{open=true},500)
    }

    const handleTouchEnd = ()=>{
        clearInterval(timer)
        open=false
    }


    function pressingDown(e) {
      // Start the timer
      e.preventDefault();
      console.log(e)
      timer = setTimeout(()=>{
        open=true
      },500)

}

    function notPressingDown(e) {
      // Stop the timer
      if(touchEndFunc) touchEndFunc()
      open=false
      clearInterval(timer)
    
    }


    const trackTouch = (e)=>{
        const node = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY)

       if(node===detectTouch){
        touchEndFunc = handleClick

       }else{
        touchEndFunc=null
       }
    
    }

</script>

{#if term.type==='term' }
<div 
class:open
    title={term.notes}
    on:click="{handleClick}"
    on:mousedown="{pressingDown}"
    on:mouseup="{notPressingDown}"
    on:mouseleave="{notPressingDown}"
    on:touchstart="{pressingDown}"
    on:touchend="{notPressingDown}"
    on:touchmove={trackTouch}
    class:disabled
    class:good={term.status===2} 
    class:neverSeen={term.status===0}
    class:regular={term.status===1}
    class:proficient={term.status===3}
    role={ disabled ? "": "button"} 
    class="secondary outline word">{term.value}

</div>
    {:else if term.type==='symbol' }

<p>{term.value}</p>
{/if}

{#if open}
<article >
    <button class="term-menu"  bind:this={detectTouch} on:click={handleClick} >Action</button>
</article>
{/if}


<style>


.term-menu {
    position: static;
}
    p{
        display: inline;
    }

.word {
    border:none;
    padding:0.3rem;
    display: inline-block;
    position: relative;
    transition: transform 0.2s;
    font-style: italic;
}



.word:hover:not(.proficient):not(.disabled) {
        transform: scale(1.5);
        z-index: 1;
    }

.disabled {
    background-color: transparent !important;
}
.neverSeen {
    background-color: pink;
}

.regular {
    background-color: yellow;
}

.good {
    background-color: greenyellow
}

.proficient {
    background-color: transparent;
    opacity: 1;
}

.open {
   /* position:fixed; */

}

.mouseover {
    background-color: black !important;
}

</style>