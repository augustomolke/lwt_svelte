<script lang='ts'>
    import Term from './Term.svelte'
    import type { Term as ITerm} from '../db'
    import currentContent from '../stores/currentContent';
    export let handleTermClick: (term:ITerm)=>void;


</script>

<div class='container-fluid'>

  {#await $currentContent.promise}
    <p>Processing...</p>
  {:then} 
  {#each $currentContent.parsed as term }
  <Term term={term} handleClick={()=>handleTermClick(term)}/>
  {/each}
  {/await}

  

</div>
