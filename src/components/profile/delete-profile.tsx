import { DeleteButton } from '../button'

export default function DeleteProfile() {
  return (
    <form hx-delete="/api/user" class="rounded-md border border-red-600">
      <div class="flex flex-col space-y-6 p-5">
        <div class="flex flex-col space-y-2">
          <h3 class="text-xl font-medium">Delete account</h3>
          <p class="text-sm text-gray-500">
            This action is permanent, please make absolutely certain you want to
            perform this action
          </p>
        </div>
      </div>
      <footer class="flex items-center justify-end rounded-b-md border-t border-red-600 bg-white p-5">
        <DeleteButton type="submit">Delete Account</DeleteButton>
      </footer>
    </form>
  )
}
