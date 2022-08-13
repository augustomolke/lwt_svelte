<script lang="ts">
    import currentContent from '../stores/currentContent'
    import db from '../db'

    const contentsPromise = db.getContents()

    

</script>


<section>
    {#await contentsPromise}

    <p>Getting your texts...</p>
        
    {:then contents}

    {#each contents as content}
        <div role="button"  on:click="{ ()=>currentContent.setPromise(currentContent.setContent(content.id))
         }">{content.title}</div>
    {/each}

    {:catch error}

    <p> Something went wrong... {error}</p>

    {/await}

</section>