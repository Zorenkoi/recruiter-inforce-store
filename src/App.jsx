import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";

import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Product />} />
        </Routes>

        <ConfirmDialog />
      </Router>
    </>
  );
};

export default App;
