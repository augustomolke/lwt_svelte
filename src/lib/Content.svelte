<script>
    export let content;
    import Term from './Term.svelte'
    $: terms = content && content.split(' ')
</script>

<div class='container-fluid'>
    
{#if terms}
{#each terms as term }
  <Term term={term}/>
{/each}
{/if}
</div>
