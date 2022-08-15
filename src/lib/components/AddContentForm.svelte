


<script lang='ts'>
import PreviewContent from './PreviewContent.svelte'
import currentContent from '../../stores/currentContent'
import {push} from 'svelte-spa-router'


let errors: Record<string, string> = {}
let originalString='' 
let title=''
let loading = false


const handleSubmit = async () => {
    loading=true
    if(title && originalString){
        const error = await currentContent.createContent(originalString,title)
        if(error){
            errors.title='This title is not unique!'
            loading=false
        }else{
            errors={}
            push(`/content/${$currentContent.id}`)
        }

    }
    if(!$currentContent.title){
        errors.title='A title is required!'
    }

    if(!$currentContent.originalString){
        errors.content='A content is required!'
    }

    loading=false

}

</script>

    <form on:submit|preventDefault={handleSubmit}>

        <input placeholder="Title" type="text" aria-invalid={errors.title && true} class:error={errors.title} bind:value={title} />
        <textarea placeholder="Something interesting to read..." type="text" aria-invalid={errors.content && true} class:error={errors.originalString}  bind:value={originalString}/>


        <PreviewContent originalString={originalString}/>


        <button aria-busy={loading}>Submit</button>

      </form>



      <style>

        .error {
            border: 1px solid red;

        }

      </style>