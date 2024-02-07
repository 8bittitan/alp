import { PropsWithChildren } from "~/types/jsx";

export function Dropdown({ children }: PropsWithChildren) {
  return (
    <div x-data="{ dropdownOpen: false }" class="relative">
      {children}
    </div>
  );
}

export function DropdownTrigger({ children }: PropsWithChildren) {
  const buttonProps = {
    "@click": "dropdownOpen = true",
  };

  return <button {...buttonProps}>{children}</button>;
}

export function DropdownContent({ children }: PropsWithChildren) {
  const parentDivProps = {
    "@click.away": "dropdownOpen = false",
    "@keydown.escape": "dropdownOpen = false",
    "x-trap.inert.noscroll": "dropdownOpen",
  };

  return (
    <div
      class="absolute top-0 z-50 w-56 mt-12 -translate-x-1/2 left-1/2"
      x-show="dropdownOpen"
      x-transition:enter="transition ease-out duration-200"
      x-transition:enter-start="opacity-0 -translate-y-2"
      x-transition:enter-end="opacity-100 translate-y-0"
      x-cloak
      {...parentDivProps}
    >
      <div class="p-1 mt-1 bg-white border rounded-md shadow-md border-neutral-200/70 text-neutral-700">
        {children}
      </div>
    </div>
  );
}
