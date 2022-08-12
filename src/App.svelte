<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import db from './db'



  let value;

  const handleSubmit = ()=>  db.addContent('Texto teste', value)

  
</script>

<main class="container">


  <form on:submit|preventDefault={handleSubmit}>
    <textarea  bind:value/>

    <button>Submit</button>
  </form>
</main>

<style>


</style>