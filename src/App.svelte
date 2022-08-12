<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import db from './db'



  let content;

  let add=[]

  const handleSubmit = async ()=> {

  const {addedTerms} = await db.addContent('Texto teste', content)

  add=addedTerms

  }

  
</script>

<main class="container">


  <form on:submit|preventDefault={handleSubmit}>
    <textarea  bind:value={content}/>

    <button>Submit</button>
  </form>

  <p>
    {add.length} palavars adicionadas
  </p>
</main>

<style>


</style>