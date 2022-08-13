<script lang='ts'>
    import Term from './Term.svelte'
    import currentContent from '../stores/currentContent'
</script>

<div class='container-fluid'>
{#each $currentContent.parsed as term }
  <Term term={term}/>
{/each}
</div>
