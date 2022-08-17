


<script lang='ts'>
import PreviewContent from '../molecules/PreviewContent.svelte'
import currentContent from '../../../stores/currentContent'
import {push} from 'svelte-spa-router'
import FloatingRoundButton from '../atoms/FloatingRoundButton.svelte'
import Loader from '../atoms/Loader.svelte'


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

    <form>

        <input placeholder="Title" type="text" aria-invalid={errors.title && true} class:error={errors.title} bind:value={title} />
        <textarea placeholder="Something interesting to read..." type="text" aria-invalid={errors.content && true} class:error={errors.originalString}  bind:value={originalString}/>

        {#if loading}
        <Loader/>
        {:else}
        <PreviewContent originalString={originalString}/>
        {/if}
      </form>

      <FloatingRoundButton onClick={handleSubmit}>
        A
      </FloatingRoundButton>



      <style>

        .error {
            border: 1px solid red;

        }

      </style>