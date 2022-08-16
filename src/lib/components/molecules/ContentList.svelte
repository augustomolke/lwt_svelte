<script lang="ts">
import db from '../../../db'
import ContentCard from '../atoms/ContentCard.svelte';
import Input from '../atoms/Input.svelte';

    let contentsPromise = db.getContents()

</script>


<section class="flex flex-col h-screen gap-5">
    <div class='flex justify-center'>  
    <Input onChange={(e) => {
        contentsPromise = db.getContents(undefined,{title:e.target.value});
    }} debounceWaitingTime={500}/>  

</div>

<div class="flex flex-col gap-2 grow">    

    {#await contentsPromise}
        <progress class="progress w-56 m-auto"></progress>
    {:then contents}
            {#each contents as content}
                <ContentCard content={content}/>
            {/each}
    {:catch error}

    <p> Something went wrong... {error}</p>

    {/await}
</div>

</section>