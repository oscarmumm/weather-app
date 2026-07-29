import { Searchbar } from "./components/Searchbar";

function App() {
    return (
        <div className="min-h-screen bg-cyan-700 flex flex-col items-center">
            <Searchbar />
            <h1 className="text-3xl font-bold underline">The Weather App</h1>
        </div>
    );
}

export default App;
