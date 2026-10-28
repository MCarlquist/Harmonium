import { Link } from "@tanstack/react-router"

function AddSongs() {
    return (
        <div>
            <p className="text-2xl text-center">Search songs to add them here</p>
            <p className="text-center">
                <button className="btn">
                    <Link to="/Search" search={{ q: "" }}>
                        Go to search
                    </Link>
                </button>
            </p>
        </div>
    )
}

export default AddSongs