<script lang="ts">
    import currentContent from '../stores/currentContent'
    import db from '../db'
    import { link } from "svelte-spa-router";

    const contentsPromise = db.getContents()

    

</script>


<section>
    {#await contentsPromise}

    <p aria-busy={true}>Getting your texts...</p>
        
    {:then contents}

    {#each contents as content}
        <a use:link href={`/content/${content.id}`} role="button">{content.title}</a>
    {/each}

    {:catch error}

    <p> Something went wrong... {error}</p>

    {/await}

</section>