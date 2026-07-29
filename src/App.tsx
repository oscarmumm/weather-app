import { Footer } from "./components/Footer";
import { Searchbar } from "./components/Searchbar";

function App() {
    return (
        <div className="min-h-screen bg-cyan-700 flex flex-col items-center justify-between">
            <Searchbar />
            <h1 className="text-3xl font-bold underline">The Weather App</h1>
            <Footer />
        </div>
    );
}

export default App;
