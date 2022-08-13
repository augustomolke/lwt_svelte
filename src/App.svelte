<script lang="ts">
import AddContentForm from "./lib/AddContentForm.svelte";
import ReadContent from "./lib/ReadContent.svelte";
import currentState from './stores/currentState'


</script>

<main class="container">

    <button on:click={()=>
        currentState.setAction('read')
        }>Read</button>
    <button on:click={()=>
        currentState.setAction('input')
    }> Create text</button>

    {#if $currentState.action === 'read'}
    <ReadContent/>
    {:else}
    <AddContentForm/>
    {/if}

</main>


