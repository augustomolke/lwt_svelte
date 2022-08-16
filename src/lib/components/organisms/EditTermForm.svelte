
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    export let term
    export let loading=false
    let value=term.notes;

	const dispatch = createEventDispatcher();

	const onSave = ()=> {
		dispatch('onSave', {
			notes:value
		})}
</script>

 <form on:submit="{onSave}">
    <textarea bind:value/>
    <button aria-busy="{loading}">Submit</button>
</form>