import { PropsWithChildren } from "~/types/jsx";

export default function Button({ children, ...props }: PropsWithChildren) {
  return (
    <button
      class="inline-flex items-center w-full px-4 py-2 text-sm font-medium leading-4 text-white bg-gray-900 md:w-auto md:rounded-full hover:bg-gray-800 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-gray-800"
      {...props}
    >
      {children}
    </button>
  );
}