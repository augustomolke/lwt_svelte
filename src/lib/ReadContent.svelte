<script lang="ts">
import currentContent from "../stores/currentContent";
    import SelectContent from "./SelectContent.svelte";
    import Content from "./Content.svelte";
    import {newStatus} from '../utils/termStatus'

</script>


<section>
    <SelectContent/>
    <Content handleTermClick={(term)=>currentContent.updateTermStatus(term.value,newStatus(term.status),true)}/>
</section>