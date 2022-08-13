<script lang="ts">    
    import type {Terms} from "../stores/currentContent";
    import currentContent from "../stores/currentContent";
    export let term: Terms;

    const statusDict = {
    0:'neverSeen',
    1:'regular',
    2:'good',
    3:'proficient'
}

const newStatus = (current:number):number=>{
    if(current < Object.keys(statusDict).length-1){
        return current +1
    }

    return 0
}
</script>

{#if term.type==='term'}
<div on:click={()=>currentContent.updateTermStatus(term.value, newStatus(term.status))} 
    class:good={term.status===2} 
    class:neverSeen={term.status===0}
    class:regular={term.status===1}
    class:proficient={term.status===3}
    role="button" 
    class="secondary outline word">{term.value}</div>
    {:else if term.type==='symbol'}
<p>{term.value}</p>
{/if}


<style>
    p{
        display: inline;
    }

.word {
    border:none;
    padding:0.5rem
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