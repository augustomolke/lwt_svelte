<script lang="ts">
import db from '../../db'
export let params={id:undefined}


const termPromise = db.getTerm(params.id)

</script>

{#await termPromise}
    <p aria-busy="true"/>
{:then term} 
    <h1>{term.value}</h1>
{/await}

