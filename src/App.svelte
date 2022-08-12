<script lang="ts">
  import Content from './lib/Content.svelte'
  import db from './db'
  import Term from './lib/Term.svelte'



  let content;
  let title;

  let add=[]

  const handleSubmit = async ()=> {

  const {addedTerms} = await db.addContent(title, content)

  add=addedTerms

  }


  
  // content && content.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]+/)


</script>

<main class="container">

  <form on:submit|preventDefault={handleSubmit}>

    <h1>Teste</h1>
    <input bind:value={title}/>
    <textarea  bind:value={content}/>

    <button>Submit</button>
  </form>

  {#if add.length>0} <p>
    {add.length} Palavras adicionadas
  </p>{/if}

  <Content content={content}/>


</main>

<style>


</style>