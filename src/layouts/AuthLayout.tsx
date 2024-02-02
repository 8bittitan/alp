import { User } from "lucia";
import Button from "~/components/button";
import { PropsWithChildren } from "~/types/jsx";

type Props = {
  user: User;
};

function AuthenticatedLayout({ children, user }: PropsWithChildren<Props>) {
  return (
    <html lang="en">
      <head>
        <title>Alp</title>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="//unpkg.com/alpinejs" defer></script>
        <link rel="stylesheet" href="/public/styles/app.css" />
      </head>
      <body>
        <div class="mx-auto max-w-7xl">
          <nav class="flex items-center w-full h-12 select-none justify-between">
            <a href="/dashboard">ALP</a>

            <Button hx-get="/api/logout">Logout</Button>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}

export default AuthenticatedLayout;
