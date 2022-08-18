<script lang='ts'>
    import Term from '../components/atoms/Term.svelte'
    import type { Term as ITerm} from '../../db'
    import { newStatus } from '../../utils/termStatus';
    import currentContent from '../../stores/currentContent/currentContent';
    import { push } from 'svelte-spa-router';
    import FloatingRoundButton from '../components/atoms/FloatingRoundButton.svelte';
import Loader from '../components/atoms/Loader.svelte';
    export let params={slug:undefined};

    const contentPromise =currentContent.getContent(params.slug)


    const handleTermClick = async (term:ITerm)=>{
      await currentContent.updateOrCreateTerm(term, {status: newStatus(term.status)})
    }

</script>

  

  <FloatingRoundButton onClick={()=>push(`/edit/${params.slug}`)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
  </FloatingRoundButton>


  {#await contentPromise}
    <Loader/>
  {:then} 
  {#if !$currentContent}
    <p>Content not found</p>
  {:else}

  <div>
  {#each $currentContent.parsed as term }
  <Term term={term} on:toggle={()=>handleTermClick(term)}/>
  {/each}
  </div>
  {/if}
  {/await}

  

<style>



</style>