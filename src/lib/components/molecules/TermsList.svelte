<script lang="ts">
import bd from '../../../db';
import Input from '../../components/atoms/Input.svelte';
import TermCard from '../../components/atoms/TermCard.svelte';

let termsPromise = bd.getTerms();

</script>


<section class="flex flex-col h-screen gap-5">
<div class='flex justify-center'>
    <Input onChange={(e) => {
        termsPromise = bd.getTerms(undefined,{value: e.target.value});
      }} debounceWaitingTime={500}/>  
</div>
    <div class="flex flex-col gap-2 grow">    
      {#await termsPromise}
        <progress class="progress w-56 m-auto"></progress>
      {:then terms}
    
      {#each terms as term (term.id)}
        <TermCard term={term}/>
      {/each}
      {/await}
    </div>
</section>