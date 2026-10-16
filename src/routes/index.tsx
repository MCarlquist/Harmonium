import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="mt-2 text-zinc-400">
        Your Tauri desktop application is running.
      </p>
    </section>
  );
}