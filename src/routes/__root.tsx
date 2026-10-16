import {
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="flex gap-4 border-b border-zinc-800 p-4">
        <Link to="/" className="[&.active]:text-green-400">
          Home
        </Link>

        <Link
          to="/Profile"
          className="[&.active]:text-green-400"
        >
          Profile
        </Link>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  ),
});