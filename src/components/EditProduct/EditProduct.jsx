import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../services/products";
import ProductForm from "../ProductForm/ProductForm";

const EditProduct = ({ isOpen, setIsOpen, product }) => {
  const queryClient = useQueryClient();

  const { mutate: updatedProductMutation } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  const handleSubmit = (updatedProduct) => {
    updatedProductMutation({ id: product.id, ...updatedProduct });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleClose}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
