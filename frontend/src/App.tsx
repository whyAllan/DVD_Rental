import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./component/Index";
import FilmView from "./component/FilmView";
import Navbar from "./component/Navbar";
import FilteredList from "./component/FilteredList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/films/:id" element={<FilmView />} />
          <Route path="/filter/:type/:id" element={<FilteredList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
