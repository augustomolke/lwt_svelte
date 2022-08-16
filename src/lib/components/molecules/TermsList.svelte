<script lang="ts">
import bd from '../../../db';
import Input from '../../components/atoms/Input.svelte';
import TermCard from '../../components/atoms/TermCard.svelte';

let termsPromise = bd.getTerms();

</script>


<section class="gap-5 flex flex-col items-center">
    <Input onChange={(e) => {
        termsPromise = bd.getTerms(undefined,{value: e.target.value});
      }} debounceWaitingTime={500}/>  
    
    {#await termsPromise}
    <progress class="progress w-56 m-auto"></progress>
        
    {:then terms}
    <div class="flex flex-col gap-2 min-w-full">
    {#each terms as term (term.id)}
      <TermCard term={term}/>
    {/each}
    </div>
        
    {/await}

</section>