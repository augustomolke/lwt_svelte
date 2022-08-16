<script lang="ts">
    import ContentList from "../components/molecules/ContentList.svelte";
    import {push} from 'svelte-spa-router'
import FloatingRoundButton from "../components/atoms/FloatingRoundButton.svelte";

</script>


<section class="flex flex-col">
    <ContentList/>
    <FloatingRoundButton onClick={()=>push('/content/create/')}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> 
    </FloatingRoundButton>
</section>