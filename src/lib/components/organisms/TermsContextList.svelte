<script lang="ts">
import db from '../../../db'
import {link} from 'svelte-spa-router'
export let term;

const contentsPromise = db.getContents(term.sources)

const getQuote = (originalString:string, term:string): string =>{

    const content = originalString.toLowerCase()
    const word = term.toLowerCase()
    const regex = RegExp(`([^a-zA-Z]${word}[^a-zA-Z])`,'gi')

    const charAmt = 120

    const index = content.search(regex)
    const start = Math.max(index-charAmt,0)
    const end = Math.min(index+word.length+charAmt, originalString.length)    


    return `...${originalString.slice(start, end)}...`.replaceAll(regex, '<strong>$1</strong>')

}


</script>

{#await contentsPromise}

<p aria-busy="true"/>
    
{:then contents}

{#each contents as content}

 <a use:link href='/content/{content.id}'>
    
    <blockquote>
        {@html getQuote(content.originalString, term.value)}
        <footer>
            <cite> {content.title} </cite>
        </footer>
    </blockquote>

</a>

{/each}
    
{/await}