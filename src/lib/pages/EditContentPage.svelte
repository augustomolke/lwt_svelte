<script lang="ts">
  import PreviewContentPage from '../components/molecules/PreviewContent.svelte';
  import db from '../../db';
  import currentContent from '../../stores/currentContent';
  import { push } from 'svelte-spa-router';
  import Loader from '../components/atoms/Loader.svelte';
  export let params = { slug: undefined };

  const contentPromise = currentContent.getContent(params.slug);
  let loading = false;

  let errors: Record<string, string> = {};
  let { originalString, title } = $currentContent;

  const handleSubmit = async () => {
    if ($currentContent.title && $currentContent.originalString) {
      await db.updateContent($currentContent.id, $currentContent);
      errors = {};
      push(`/content/${$currentContent.id}`);
    }
    if (!$currentContent.title) {
      errors.title = 'A title is required!';
    }

    if (!$currentContent.originalString) {
      errors.content = 'A content is required!';
    }
  };

  const setCurrentContent = () =>
    currentContent.createContent(
      originalString,
      title,
      $currentContent.parsed,
      false
    );
  const setCurrentTitle = () => currentContent.setTitle(title);

  const handleDelete = async () => {
    loading = true;
    await currentContent.delete(params.slug);
    push('/content');
  };
</script>

{#await contentPromise}
  <Loader />
{:then}
  <form on:submit|preventDefault={handleSubmit}>
    <h1>Teste</h1>
    <input
      class:error={errors.title}
      bind:value={title}
      on:input={setCurrentTitle}
    />
    <textarea
      class:error={errors.originalString}
      bind:value={originalString}
      on:input={setCurrentContent}
    />

    <PreviewContentPage {originalString} />

    <button>Submit</button>
  </form>
  <button class="secondary" aria-busy={loading} on:click={handleDelete}
    >Delete</button
  >
{/await}

<style>
  .error {
    border: 1px solid red;
  }
</style>
