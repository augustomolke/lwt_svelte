<script lang="ts">
import Content from './lib/Content.svelte'
import db from './db'
import currentContent from './stores/currentContent'


let content = $currentContent.originalString
let title = $currentContent.title

const handleSubmit = async () => {
    await db.addContent($currentContent.title, $currentContent.originalString)
}

// content && content.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]+/)


</script>

<main class="container">

    <form on:submit|preventDefault={handleSubmit}>

        <h1>Teste</h1>
        <input bind:value={title} on:input="{()=>currentContent.setContent(content, title)}"/>
        <textarea  bind:value={content} on:input="{()=>currentContent.setContent(content, title)}"/>
        <button>Submit</button>
      </form>

    <Content/>
</main>

<style>

</style>
