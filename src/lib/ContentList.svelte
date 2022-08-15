<script lang="ts">
    import currentContent from '../stores/currentContent'
    import db from '../db'
    import { link } from "svelte-spa-router";

    const contentsPromise = db.getContents()


</script>


<section >
    

    {#await contentsPromise}
        <p aria-busy={true}></p>
    {:then contents}
        <input type="search"id="search" name="search" placeholder="Search"/>

        <div class="grid">

        {#each contents as content}
        <a use:link href={`/content/${content.id}`}>   
            <article>
                <header>
            
                    <h4>{content.title}</h4>
                </header>

                <footer>Last time seen...</footer>
            </article>
        </a>
        {/each}
    </div>
    {:catch error}

    <p> Something went wrong... {error}</p>

    {/await}

</section>