import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

const ProductForm = ({ onSubmit, onCancel, product }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCount(product.count);
      setWeight(product.weight);
      setWidth(product.size.width);
      setHeight(product.size.height);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  const validateFields = () => {
    if (!name || !count || !weight || !width || !height || !imageUrl) {
      setError("Please fill in all the fields.");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const updatedProduct = {
      name,
      imageUrl,
      count: parseInt(count),
      weight,
      size: { width: parseInt(width), height: parseInt(height) },
    };

    onSubmit(updatedProduct);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              error={!name}
              helperText={!name ? "This field is required" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Count"
              fullWidth
              value={count}
              onChange={(e) => setCount(e.target.value)}
              margin="normal"
              required
              type="number"
              error={!count}
              helperText={!count ? "This field is required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image Url"
              fullWidth
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              margin="normal"
              required
              type="url"
              error={!imageUrl}
              helperText={!imageUrl ? "This field is required" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Weight"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              margin="normal"
              required
              error={!weight}
              helperText={!weight ? "This field is required" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Width (size)"
              fullWidth
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              margin="normal"
              required
              type="number"
              error={!width}
              helperText={!width ? "This field is required" : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Height (size)"
              fullWidth
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              margin="normal"
              required
              type="number"
              error={!height}
              helperText={!height ? "This field is required" : ""}
            />
          </Grid>

          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>

            <Button onClick={handleSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
