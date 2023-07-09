<script lang="ts">
  import { useChat } from "ai/svelte";
  import SendIcon from "../components/sendIcon.svelte";
  import "../app.css";
  import { onMount, afterUpdate } from "svelte";

  const { input, handleSubmit, messages } = useChat();
  const msg = [{role: "user", content: "hola"} , {role: "assistant", content: "aa"}]
  const userStyle = "bg-green-200 w-fit rounded-l-lg rounded-tr-lg p-3"
  const assistantStyle = "bg-cyan-950 text-white w-fit rounded-r-lg rounded-bl-lg p-3"
  let messageBoxRef: HTMLUListElement | null

  function scrollToBottom() {
    if (messageBoxRef) {
      messageBoxRef.scrollTop = messageBoxRef.scrollHeight
    }
  }

  // Escucha cambios en messagesFromStore
  $: {
    afterUpdate(scrollToBottom)
  }

  // Ejecuta scrollToBottom después de que el componente se monta en el DOM
  onMount(scrollToBottom)
</script>

<main class="grid place-content-center h-screen bg-slate-200">
  <div class="bg-slate-500 w-[80vw] h-[800px] rounded-lg grid items-end overflow-hidden grid-rows-[94%_minmax(10px,_1fr)_0px] shadow-xl">
    <ul class="p-4 flex gap-6 flex-col overflow-y-scroll overflow-x-hidden h-full" bind:this={messageBoxRef}>
      {#each $messages as message}
        <li id={message.role} class={message.role === 'user' ? `flex justify-end` : `flex justify-start flex-col`} >
          {#if message.role === 'assistant'}
        <span class="text-slate-200">Larry</span>
      {/if}
          <p class={message.role === 'user' ? userStyle : assistantStyle} >{message.content}</p>
        </li>
      {/each}
    </ul>
    <form class="flex" on:submit={handleSubmit}>
      <input
        class="w-full resize-none focus-visible:!outline-none p-3"
        bind:value={$input}
      />
      <button class="bg-white border-l p-3" type="submit"><SendIcon /></button>
    </form>
  </div>
</main>

<style>
#assistant{
	-webkit-animation: slideL 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slideL 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
#user{
  -webkit-animation: slideR 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slideR 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes slideL {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideR {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>