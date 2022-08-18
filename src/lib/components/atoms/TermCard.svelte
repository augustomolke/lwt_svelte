<script lang="ts">
  import type { Term } from '../../../db';
  import { link } from 'svelte-spa-router';

  export let term: Term;
</script>

<details>
  <summary class="contrast">{term.value}</summary>
  <p>{term.status}</p>
  <a use:link href="/terms/{term.id}">More</a>
</details>
