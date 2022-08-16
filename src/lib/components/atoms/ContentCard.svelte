<script lang="ts">
    import type { Content } from "../../../db";
    import { link } from "svelte-spa-router";
    export let content:Content;
</script>


<a use:link href={`/content/${content.id}`}>   
    <div class="card lg:card-side bg-base-100 shadow-xl">
    <!-- <figure><img src="https://placeimg.com/400/400/arch" alt="Album"></figure> -->
    <div class="card-body">
        <h2 class="card-title">{content.title}</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div class="card-actions justify-end">
        </div>
    </div>
    </div>
</a>