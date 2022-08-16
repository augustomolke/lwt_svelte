<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <IconButton class="material-icons">menu</IconButton>
      <Title>Standard</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" aria-label="Download"
        >file_download</IconButton
      >
      <IconButton class="material-icons" aria-label="Print this page"
        >print</IconButton
      >
      <IconButton class="material-icons" aria-label="Bookmark this page"
        >bookmark</IconButton
      >
    </Section>
  </Row>
</TopAppBar>
<AutoAdjust {topAppBar}>

 <div>
  <!--
    Note: tabs must be unique. (They cannot === each other.)
  -->
  <TabBar tabs={['Home', 'Merchandise', 'About Us']} let:tab bind:active>
    <!-- Note: the `tab` property is required! -->
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>
 
</div>

<slot/>

</AutoAdjust>

<script lang="ts">
  import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Tab, { Label } from '@smui/tab';
import TabBar from '@smui/tab-bar';
 
  let active = 'Home';

  let topAppBar: TopAppBarComponentDev;
</script>

<style>
  /* Hide everything above this component. */
  :global(app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>