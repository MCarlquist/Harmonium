import { createFileRoute } from "@tanstack/react-router";
import Table from "../Components/Library/Table";
import { useState } from "react";
import AddSongs from "../Components/Library/AddSongs";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    const [songs, setSongs] = useState([]);
    return (
        <>
            <section>
                <h1 className="text-3xl font-bold">Library</h1>
            </section>
            <div>
                {songs.length > 0 ? <Table /> : <AddSongs />}
            </div>
        </>
    );
}
