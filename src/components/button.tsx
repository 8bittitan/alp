import { PropsWithChildren } from '~/types/jsx'

type ButtonProps = Record<string, unknown>

export default function Button({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      class="inline-flex w-full items-center bg-gray-900 px-4 py-2 text-sm font-medium leading-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 md:w-auto md:rounded-full md:focus:ring-2"
      {...props}
    >
      {children}
    </button>
  )
}

export function DeleteButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      class="inline-flex w-full items-center bg-red-600 px-4 py-2 text-sm font-medium leading-4 text-white hover:bg-red-800 focus:outline-none focus:ring-0 focus:ring-gray-800 focus:ring-offset-2 md:w-auto md:rounded-full md:focus:ring-2"
      {...props}
    >
      {children}
    </button>
  )
}
