<script lang="ts">    
    import type {Term} from "../../../db";
    import {createEventDispatcher} from 'svelte'
    export let term: Term;
    export let disabled:boolean = false;

    const dispatcher = createEventDispatcher()
    const handleClick = ()=>{
        dispatcher('toggle')
    }

    const handleMousedown = ()=>{
        console.log('mouseDown')
    }


</script>

{#if term.type==='term' }
<div on:click={handleClick}
    on:mousedown={handleMousedown}
    class:disabled
    class:good={term.status===2} 
    class:neverSeen={term.status===0}
    class:regular={term.status===1}
    class:proficient={term.status===3}
    role={ disabled ? "": "button"} 
    class="secondary outline word">{term.value}</div>
    {:else if term.type==='symbol' }
<p>{term.value}</p>
{/if}


<style>
    p{
        display: inline;
    }

.word {
    border:none;
    padding:0.3rem;
    display: inline-block;
    opacity: 0.5;
    position: relative;
    transition: transform 0.2s, opacity 0.1s;
    font-style: italic;
}

.word:hover:not(.proficient):not(.disabled) {
        transform: scale(1.5);
        opacity: 1;
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
}

</style>