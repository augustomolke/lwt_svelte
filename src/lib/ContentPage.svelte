<script lang='ts'>
    import Term from './Term.svelte'
    import type { Term as ITerm} from '../db'
    import { newStatus } from '../utils/termStatus';
    import currentContent from '../stores/currentContent/currentContent';
    export let params={slug:undefined};

    const contentPromise = currentContent.getContent(params.slug)


    const handleTermClick = async (term:ITerm)=>{
      await currentContent.updateOrCreateTerm(term, {status: newStatus(term.status)})
    }

</script>

<div class='container-fluid'>

  {#await contentPromise}
    <p aria-busy={true}>Processing...</p>
  {:then} 
  {#if !$currentContent}
    <p>Content not found</p>
  {:else}
  {#each $currentContent.parsed as term }
  <Term term={term} handleClick={()=>handleTermClick(term)}/>
  {/each}
  {/if}
  {/await}

  

</div>
