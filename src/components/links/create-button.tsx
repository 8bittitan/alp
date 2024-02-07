export default function CreateLinkButton() {
  return (
    <button
      x-on:click="createLinkModalOpen = true"
      class="inline-flex h-10 items-center justify-center rounded-md border bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black focus:bg-black focus:outline-none focus:ring-2 focus:ring-neutral-200/60 focus:ring-offset-2 active:bg-black disabled:pointer-events-none disabled:opacity-50"
    >
      Create Link
    </button>
  )
}
