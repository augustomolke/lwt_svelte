

<script lang="ts">
    import configs from '../../stores/configs'

let darkTheme=$configs.theme==='dark';

let primaryColor=$configs.colors.primary;
let primaryHover = $configs.colors.primary;
let primaryFocus = $configs.colors.primary;
let primaryInverse = $configs.colors.primary;

const handleSwitch=()=>{
        darkTheme=!darkTheme
        configs.applyTheme(configs.availableThemes[darkTheme ? 'dark' : 'light'])
    }

const handleColorPick = (key)=>{
    configs.applyColors({[key]:primaryColor})
}

</script>


<form>
    <input type=checkbox role=switch id="primary" name="primary" on:change="{handleSwitch}" bind:checked={darkTheme}>
    <input type="color" id="primary" name="primary" bind:value={primaryColor} on:change="{()=>handleColorPick('primary')}">
    <input type="color" id="primary-hover" name="primary-hover" bind:value={primaryHover} on:change="{()=>handleColorPick("primary-hover")}">
    <input type="color" id="primary-focus" name="primary-focus" bind:value={primaryFocus} on:change="{()=>handleColorPick("primary-focus")}">
    <input type="color" id="primary-inverse" name="primaru-inverse" bind:value={primaryInverse} on:change="{()=>handleColorPick("primary-inverse")}">

</form>