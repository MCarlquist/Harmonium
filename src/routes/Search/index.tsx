import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Search/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Search</h1>
    </div>
  );
}
