<script lang="ts">
import bd from '../../db';
import { link } from "svelte-spa-router";
import debounce from 'lodash/debounce'

let value;
let termsPromise = bd.getTerms();

const debounced = debounce(() => {
			termsPromise = bd.getTerms(undefined,{value});
		},500)

const init=(el)=>{
    el.focus()
  }

</script>


<section>
{#await termsPromise}
<p aria-busy="true"/>
    
{:then terms}

<input type="search" use:init bind:value on:keyup|preventDefault="{debounced}"/>

{#each terms as term (term.id)}
<details>
    <summary>{term.value}</summary>
    <p>{term.status}</p>
    <a use:link href="/terms/{term.id}">Editar</a>
</details>
    
{/each}
    
{/await}

</section>