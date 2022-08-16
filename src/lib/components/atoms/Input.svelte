

<script lang="ts">
    import debounce from 'lodash/debounce'

    export let onChange;
    export let debounceWaitingTime;
    export let autoFocus = false;

    let value;


    const fn = debounceWaitingTime ? (e)=> debounce(onChange(e), debounce): onChange;

    const init=(el)=>{
        if(autoFocus) el.focus()
    }


</script>


<input class="input input-bordered w-full max-w-xs" 
type="search"
id="search" 
name="search" 
placeholder="Search" 
use:init
bind:value 
on:keyup|preventDefault="{fn}"
/>
