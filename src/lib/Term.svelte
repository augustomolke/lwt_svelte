<script lang="ts">    
    import type {Term} from "../db";
    export let term: Term;
    export let disabled:boolean = false;
    export let handleClick: ()=>void = ()=>null;


</script>

{#if term.type==='term' }
<div on:click={handleClick}
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
    padding:0.5rem;
    display: inline-block;
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