<script lang="ts">
    import currentContent from '../stores/currentContent'
    import db from '../db'

    const contentsPromise = db.getContents()


$: console.log($currentContent.parsed.filter(p=>p.id==='VIDIS'))
</script>


<section>
    {#await contentsPromise}

    <p>Getting your texts...</p>
        
    {:then contents}

    {#each contents as content}
        <div role="button"  on:click="{()=>currentContent.setContent(content.id)}">{content.title}</div>
    {/each}

    {:catch error}

    <p> Something went wrong... {error}</p>

    {/await}

</section>