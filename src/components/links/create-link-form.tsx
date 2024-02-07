import Button from '~/components/button'

type Props = {
  defaultKey: string
}

export default function CreateLinkForm({ defaultKey }: Props) {
  return (
    <form
      hx-post="/api/link"
      hx-trigger="submit"
      hx-swap="beforeend"
      hx-target="#links"
      hx-on-htmx-after-request="event.detail.target.dispatchEvent(new CustomEvent('close-modal', {bubbles: true}))"
    >
      {/* <input type="text" placeholder="domain" name="domain" id="domain" /> */}
      <label class="mb-4 flex flex-col space-y-1">
        <span>Destination URL</span>
        <input type="text" placeholder="url" name="url" id="url" />
      </label>
      <label class="mb-4 flex flex-col space-y-1">
        <span>Short link</span>
        <input
          type="text"
          placeholder="key"
          name="key"
          id="key"
          value={defaultKey}
        />
      </label>
      <div class="flex w-full justify-end">
        <Button type="submit">Create Link</Button>
      </div>
    </form>
  )
}
