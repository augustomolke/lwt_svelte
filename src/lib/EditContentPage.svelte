


<script lang='ts'>
import PreviewContentPage from './PreviewContentPage.svelte'
import db from '../db'
import currentContent from '../stores/currentContent'
import { push } from 'svelte-spa-router';
export let params={slug:undefined};

const contentPromise = currentContent.getContent(params.slug)


let errors: Record<string, string> = {}
let {originalString, title} = $currentContent


const handleSubmit = async () => {
    if($currentContent.title && $currentContent.originalString){
        await db.updateContent($currentContent.id, $currentContent)
        errors={}
        push(`/content/${$currentContent.id}`)
    }
    if(!$currentContent.title){
        errors.title='A title is required!'
    }

    if(!$currentContent.originalString){
        errors.content='A content is required!'
    }

}

const setCurrentContent =  ()=>currentContent.createContent(originalString,title, $currentContent.parsed,false)
const setCurrentTitle =  ()=> currentContent.setTitle(title)

</script>

    {#await contentPromise}
        <p aria-busy={true}>Processing...</p>
    {:then} 
    <form on:submit|preventDefault={handleSubmit}>

    <h1>Teste</h1>
    <input  class:error={errors.title} bind:value={title} on:input="{setCurrentTitle}"/>
    <textarea  class:error={errors.originalString}  bind:value={originalString} on:input="{setCurrentContent}"/>


    <PreviewContentPage originalString={originalString}/>


    <button>Submit</button>
  </form>
   {/await}





      <style>

        .error {
            border: 1px solid red;
        }
      </style>