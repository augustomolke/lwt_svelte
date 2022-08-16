<script lang="ts">
import db from '../../../db'
import ContentCard from '../atoms/ContentCard.svelte';
import Input from '../atoms/Input.svelte';

    let contentsPromise = db.getContents()

</script>


<section class="gap-5 flex flex-col items-center">
    <Input onChange={(e) => {
        contentsPromise = db.getContents(undefined,{title:e.target.value});
    }} debounceWaitingTime={500}/>  
    {#await contentsPromise}
    <progress class="progress w-56 m-auto"></progress>
    {:then contents}
  
        <div class="flex flex-col gap-2 min-w-full">
        {#each contents as content}
            <ContentCard content={content}/>
        {/each}
    </div>
    {:catch error}

    <p> Something went wrong... {error}</p>

    {/await}

</section>