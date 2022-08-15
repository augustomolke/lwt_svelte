<script lang="ts">
import db from '../../db'
import {link} from 'svelte-spa-router'
export let term;

const contentsPromise = db.getContents(term.sources)

const getQuote = (originalString:string, term:string): string =>{

    const content = originalString.toLowerCase()
    const word = term.toLowerCase()

    const charAmt = 150

    const index = content.indexOf(word)
    const start = Math.max(index-charAmt,0)
    const end = Math.min(index+charAmt, originalString.length)


    return `...${originalString.slice(start, end)}...`

}


</script>

{#await contentsPromise}

<p aria-busy="true"/>
    
{:then contents}

{#each contents as content}

 <a use:link href='/content/{content.id}'>
    
    <blockquote>
        {getQuote(content.originalString, term.value)}
        <footer>
            <cite> {content.title} </cite>
        </footer>
    </blockquote>

</a>

{/each}
    
{/await}