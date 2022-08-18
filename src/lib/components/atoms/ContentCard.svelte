<script lang="ts">
  import type { Content } from '../../../db';
  import { link } from 'svelte-spa-router';
  import moment from 'moment';
  export let content: Content;
</script>

<a use:link href={`/content/${content.id}`}>
  <article>
    <header>{content.title}</header>
    <p class="quote">{`${content.originalString.slice(0, 150)}...`}</p>
    <footer>
      {`Last updated on ${moment(content.updatedAt).format('DD-MMMM-yyyy')}`}
    </footer>
  </article>
</a>

<style>
  .quote {
    font-style: italic;
  }
</style>
