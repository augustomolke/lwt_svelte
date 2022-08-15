<script lang="ts">
import db from '../../db'
import ContextsPage from '../components/ContextsPage.svelte';
import EditTermForm from '../components/EditTermForm.svelte'
export let params={id:undefined}
let loading=false

const termPromise = db.getTerm(params.id)

</script>

{#await termPromise}
    <p aria-busy="true"/>
{:then term} 
<article>
    <header>{term.value}</header>
    <ContextsPage term={term}/>
    <EditTermForm loading={loading} term={term} on:onSave="{async (e)=>{
    loading = true
    await db.updateTerm({...term, notes: e.detail.notes})
    loading=false
    }}"/>
    <footer> bla bla</footer>

</article>
{/await}

