import { Button } from "@mui/material";
import { useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import AddNewProduct from "../components/addNewProduct/addNewProduct";
import SortSelector from "../components/SortSelector/SortSelector";

function Home() {
  const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] =
    useState(false);

  const [sortBy, setSortBy] = useState("alphabet");

  return (
    <>
      <Button onClick={() => setIsAddNewProductModalOpen(true)}>
        Add Product
      </Button>

      <SortSelector value={sortBy} setValue={setSortBy} />

      <ProductList sortBy={sortBy} />

      <AddNewProduct
        isOpen={isAddNewProductModalOpen}
        setIsOpen={setIsAddNewProductModalOpen}
      />
    </>
  );
}

export default Home;
