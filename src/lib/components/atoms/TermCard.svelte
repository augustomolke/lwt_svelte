<script lang="ts">
    import type {Term} from "../../../db";
    import { link } from "svelte-spa-router";

    export let term:Term
</script>


<div tabindex="0" aria-label="Term information" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"> 
    <div class="collapse-title text-xl font-medium">{term.value}</div>
    <div class="collapse-content">
        <a use:link href="/terms/{term.id}">More</a>
        <p>{term.status}</p>
    </div>
</div>