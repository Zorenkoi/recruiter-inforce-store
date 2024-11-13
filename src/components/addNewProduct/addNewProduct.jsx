import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ProductForm from "../ProductForm/ProductForm";
import { postProduct } from "../../services/products";

const AddNewProduct = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();

  const { mutate: postProductMutation } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleClose = () => setIsOpen(false);

  const handleSubmit = (product) => {
    console.log(product);

    postProductMutation({ ...product, comments: [] });

    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add a New Product</DialogTitle>
      <DialogContent>
        <ProductForm onSubmit={handleSubmit} onCancel={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProduct;
