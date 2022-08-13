


<script lang='ts'>
import Content from './Content.svelte'
import db from '../db'
import currentContent from '../stores/currentContent'
import {newStatus} from '../utils/termStatus'


let errors: Record<string, string> = {}
let {originalString, title} = $currentContent

let contentPromise;

const handleSubmit = async () => {
    if($currentContent.title && $currentContent.originalString){
        if($currentContent.id){
            db.updateContent($currentContent.id, $currentContent)
        }else{
        contentPromise = currentContent.createContent(originalString,title)
        }
        errors={}
    }
    if(!$currentContent.title){
        errors.title='A title is required!'
    }

    if(!$currentContent.originalString){
        errors.content='A content is required!'
    }

}

const setCurrentContent =  ()=>contentPromise= currentContent.createContent(originalString,title, false)
const setCurrentTitle =  ()=> currentContent.setTitle(title)

</script>

    <form on:submit|preventDefault={handleSubmit}>

        <h1>Teste</h1>
        <input  class:error={errors.title} bind:value={title} on:input="{setCurrentTitle}"/>
        <textarea  class:error={errors.originalString}  bind:value={originalString} on:input="{setCurrentContent}"/>

        {#await contentPromise}
        <p> Processing... </p>
        {:then}
        <Content handleTermClick={(term)=>currentContent.updateTermStatus(term.value, newStatus(term.status))}/>
        {:catch error}

        <p> Something went wrong...{error}</p>

        {/await}

        <button>Submit</button>
      </form>



      <style>

        .error {
            border: 1px solid red;
        }
      </style>