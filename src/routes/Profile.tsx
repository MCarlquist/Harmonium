import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Profile</h1>
    </div>
  );
}
