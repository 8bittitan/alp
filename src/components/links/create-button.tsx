export default function CreateLinkButton() {
  return (
    <button
      x-on:click="createLinkModalOpen = true"
      class="inline-flex items-center justify-center h-10 px-4 py-2 text-white text-sm font-medium transition-colors bg-black border rounded-md hover:bg-black active:bg-black focus:bg-black focus:outline-none focus:ring-2 focus:ring-neutral-200/60 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    >
      Create Link
    </button>
  );
}
