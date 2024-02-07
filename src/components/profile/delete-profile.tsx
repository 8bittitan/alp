import { DeleteButton } from "../button";

export default function DeleteProfile() {
  return (
    <form hx-delete="/api/user" class="border border-red-600 rounded-md">
      <div class="p-5 flex flex-col space-y-6">
        <div class="flex flex-col space-y-2">
          <h3 class="font-medium text-xl">Delete account</h3>
          <p class="text-sm text-gray-500">
            This action is permanent, please make absolutely certain you want to
            perform this action
          </p>
        </div>
      </div>
      <footer class="flex items-center justify-end bg-white p-5 border-t border-red-600 rounded-b-md">
        <DeleteButton type="submit">Delete Account</DeleteButton>
      </footer>
    </form>
  );
}
