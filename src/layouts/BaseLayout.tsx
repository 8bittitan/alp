import { PropsWithChildren } from "~/types/jsx";

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>Alp</title>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="//unpkg.com/alpinejs" defer></script>
        <link rel="stylesheet" href="/public/styles/app.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default BaseLayout;
