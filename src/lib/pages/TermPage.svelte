<script lang="ts">
import db from '../../db'
import TermsContextList from '../components/organisms/TermsContextList.svelte';
import EditTermForm from '../components/organisms/EditTermForm.svelte'
export let params={id:undefined}
let loading=false

const termPromise = db.getTerm(params.id)

</script>


{#await termPromise}

    <progress class="progress w-56"></progress>
{:then term} 
<article>
    <header>{term.value}</header>
    <TermsContextList term={term}/>
    <EditTermForm loading={loading} term={term} on:onSave="{async (e)=>{
    loading = true
    await db.updateTerm({...term, notes: e.detail.notes})
    loading=false
    }}"/>
    <footer> bla bla</footer>

</article>
<iframe src={`https://www.linguee.com/english-portuguese/translation/${term.value}.html`} title={term.value}/>

{/await}

