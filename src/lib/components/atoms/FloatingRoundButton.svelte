<script lang="ts">
    export let onClick;

</script>

<button class=" z-30 btn btn-circle fixed right-6 bottom-20" on:click="{onClick}">
    <slot/>
</button>