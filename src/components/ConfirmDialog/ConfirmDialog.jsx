import { useDispatch, useSelector } from "react-redux";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { closeConfirm } from "../../store/confirmSlice";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/products";

const ConfirmDialog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { question, productId, isOpen } = useSelector((state) => state.confirm);

  const { mutate: handleDeleteProduct } = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleClose = () => {
    dispatch(closeConfirm());
  };

  const handleConfirm = () => {
    if (productId) {
      handleDeleteProduct(productId);
      navigate("/");
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
