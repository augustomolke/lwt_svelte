<script lang="ts">
    import debounce from 'lodash/debounce'
    import db from '../../db'
    import { link } from "svelte-spa-router";

    let contentsPromise = db.getContents()

    let value;

    const debounced = debounce(() => {
                contentsPromise = db.getContents(undefined,{title:value});
            }, 500);

    const init=(el)=>{
        el.focus()
    }


</script>


<section >
    

    {#await contentsPromise}
        <p aria-busy={true}></p>
    {:then contents}
        <input type="search"id="search" name="search" placeholder="Search" use:init bind:value on:keyup="{debounced}"/>
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