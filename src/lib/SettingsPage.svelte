

<script lang="ts">
    import theme from '../stores/theme'

let darkTheme=$theme==='dark';

let primaryColor="#d81b60";

const handleSwitch=()=>{
        darkTheme=!darkTheme
        theme.applyTheme(theme.availableThemes[darkTheme ? 'dark' : 'light'])
    }

</script>


<form>
    <input type=checkbox role=switch id="primary" name="primary" on:change="{handleSwitch}" bind:checked={darkTheme}>
    <input type="color" id="color" name="color" bind:value={primaryColor}>
</form>