<script lang='ts'>
    import Term from './Term.svelte'
    import currentContent from '../../stores/currentContent/currentContent';
    export let originalString = ''


$: terms = currentContent.parseOriginalString(originalString)

</script>

<div class='container-fluid'>

  {#each terms as term }
  <Term disabled={true} term={term}/>
  {/each}
  

</div>
