


<script lang='ts'>
import PreviewContentPage from './PreviewContentPage.svelte'
import db from '../db'
import currentContent from '../stores/currentContent'


let errors: Record<string, string> = {}
let {originalString, title} = $currentContent


const handleSubmit = async () => {
    if($currentContent.title && $currentContent.originalString){
        if($currentContent.id){
            db.updateContent($currentContent.id, $currentContent)
        }else{
        await currentContent.createContent(originalString,title,$currentContent.parsed)
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

const setCurrentContent =  ()=>currentContent.createContent(originalString,title, $currentContent.parsed,false)
const setCurrentTitle =  ()=> currentContent.setTitle(title)

</script>

    <form on:submit|preventDefault={handleSubmit}>

        <h1>Teste</h1>
        <input  class:error={errors.title} bind:value={title} on:input="{setCurrentTitle}"/>
        <textarea  class:error={errors.originalString}  bind:value={originalString} on:input="{setCurrentContent}"/>


        <PreviewContentPage />


        <button>Submit</button>
        <button on:click={()=>{
            currentContent.setDefault()
            originalString=''
            title=''}
        }>+</button>
      </form>



      <style>

        .error {
            border: 1px solid red;
        }
      </style>