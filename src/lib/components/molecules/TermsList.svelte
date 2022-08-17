<script lang="ts">
import bd from '../../../db';
import Input from '../../components/atoms/Input.svelte';
import TermCard from '../../components/atoms/TermCard.svelte';
import Loader from '../atoms/Loader.svelte';

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

      <Loader/>

      {:then terms}
    
      {#each terms as term (term.id)}
        <TermCard term={term}/>
      {/each}
      {/await}
    </div>
</section>