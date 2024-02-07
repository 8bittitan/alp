import { User } from "lucia";
import { PropsWithChildren } from "~/types/jsx";
import Button from "../button";

type Props = {
  user: User;
};

export default function ProfileAvatar({ user }: PropsWithChildren<Props>) {
  return (
    <>
      <form
        class="border border-gray-200 rounded-md"
        x-data="{
          files: [],
        }"
      >
        <div class="p-5 flex flex-col space-y-6">
          <div class="flex flex-col space-y-2">
            <h3 class="font-medium text-xl">Your Avatar</h3>
            <p class="text-sm text-gray-500">Your personal avatar on Alp</p>
          </div>

          <div class="relative ">
            <input
              type="file"
              name="avatar"
              class="sr-only"
              x-on:change="files = $event.target.files"
              // x-on:dragover="$el.classList.add('active')"
              // x-on:dragleave="$el.classList.remove('active')"
            />
          </div>
        </div>
        <footer class="flex items-center justify-end bg-gray-100 p-5">
          <Button type="submit">Save</Button>
        </footer>
      </form>
    </>
  );
}
