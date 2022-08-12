<script>    
    export let term;

    const statusDict = {
    0:'neverSeen',
    1:'regular',
    2:'good',
    3:'proficient'
}

    const hasSymbol = term.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]+/)
    $: words = hasSymbol ? hasSymbol.input.split(hasSymbol[0]).filter(w=>w)
    .map(w=>({word:w, status:0})) : [{word:term, status:0}]
    $: symb = hasSymbol && hasSymbol[0]

    const handleClick = (inputW, inputS)=>{
        words = words.map(w=>{
            if(w.word===inputW){
                return {word:inputW, status: inputS < Object.keys(statusDict).length - 1 ? inputS+1 : 0}
            }

            return w
        })
    }


</script>

{#each words as {word, status}}
<div on:click={()=>handleClick(word, status)} 
    class:good={status===2} 
    class:neverSeen={status===0}
    class:regular={status===1}
    class:proficient={status===3}
    role="button" 
    class="secondary outline word">{word}</div>
{/each}
{#if hasSymbol}
<p>{symb}</p>
{/if}


<style>
    p{
        display: inline;
    }

.word {
    border:none;
    padding:0.5rem
}

.neverSeen {
    background-color: pink;
}

.regular {
    background-color: yellow;
}

.good {
    background-color: greenyellow
}

.proficient {
    background-color: transparent;
}

</style>