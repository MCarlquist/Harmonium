import { createFileRoute } from "@tanstack/react-router";
import Table from "../Components/Library/Table";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    return (
        <>
            <section>
                <h1 className="text-3xl font-bold">Library</h1>
            </section>
            <div>
                <p>Add Songs</p>
                <Table />
            </div>
        </>
    );
}