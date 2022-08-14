


<script lang='ts'>
import PreviewContentPage from './PreviewContentPage.svelte'
import currentContent from '../stores/currentContent'
import {push} from 'svelte-spa-router'


let errors: Record<string, string> = {}
let originalString='' 
let title=''
let loading = false


const handleSubmit = async () => {
    loading=true
    if(title && originalString){
        await currentContent.createContent(originalString,title)
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

</script>

    <form on:submit|preventDefault={handleSubmit}>

        <h1>Teste</h1>
        <input  class:error={errors.title} bind:value={title} />
        <textarea  class:error={errors.originalString}  bind:value={originalString}/>


        <PreviewContentPage originalString={originalString}/>


        <button aria-busy={loading}>Submit</button>

      </form>



      <style>

        .error {
            border: 1px solid red;
        }
      </style>