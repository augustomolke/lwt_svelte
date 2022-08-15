

<script lang="ts">
    import configs from '../../stores/configs'

let darkTheme=$configs.theme==='dark';

let primaryColor=$configs.colors.primary;
let primaryHover = $configs.colors['primary-hover'];
// let primaryFocus = $configs.colors['primary-focus'];
let primaryInverse = $configs.colors['primary-inverse'];

const handleSwitch=()=>{
        darkTheme=!darkTheme
        configs.applyTheme(configs.availableThemes[darkTheme ? 'dark' : 'light'])
    }

const handleColorPick = (key, value)=>{
    configs.applyColors({[key]:value})
}

$: console.log(primaryInverse)

</script>


<form>
    <input type=checkbox role=switch id="primary" name="primary" on:change="{handleSwitch}" bind:checked={darkTheme}>
    <input type="color" id="primary" name="primary" bind:value={primaryColor} on:change="{()=>handleColorPick('primary', primaryColor)}">
    <input type="color" id="primary-hover" name="primary-hover" bind:value={primaryHover} on:change="{()=>handleColorPick("primary-hover", primaryHover)}">
    <!-- <input type="color" id="primary-focus" name="primary-focus" bind:value={primaryFocus} on:change="{()=>handleColorPick("primary-focus", primaryFocus)}"> -->
    <input type="color" id="primary-inverse" name="primary-inverse" bind:value={primaryInverse} on:change="{()=>handleColorPick("primary-inverse",primaryInverse)}">

    <button on:click="{configs.resetConfigs}">Reset</button>
</form>