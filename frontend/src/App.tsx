import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./component/Index";
import FilmView from "./component/FilmView";
import Navbar from "./component/Navbar";
import FilteredList from "./component/FilteredList";
import StoreView from "./component/StoreView";
import SearchResults from "./component/SearchResults";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/filter" element={<FilteredList />} />
          <Route path="/filter/:type/:id" element={<FilteredList />} />
          <Route path="/films/:id" element={<FilmView />} />
          <Route path="/store/:id" element={<StoreView />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
