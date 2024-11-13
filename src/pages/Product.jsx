import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { openConfirm } from "../store/confirmSlice";

import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CardMedia,
  Grid,
} from "@mui/material";
import EditProduct from "../components/EditProduct/EditProduct";
import CommentList from "../components/CommentList/CommentList";
import { fetchProductById } from "../services/products";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(
      openConfirm({
        question: `Are you sure you want to delete ${product.name}?`,
        productId: product.id,
      })
    );
  };

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="300"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6">Count: {product.count}</Typography>
              <Typography variant="h6">width: {product.size.width}</Typography>
              <Typography variant="h6">
                height: {product.size.height}
              </Typography>
              <Typography variant="h6">weight: {product.weight}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Product
          </Button>

          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete Product
          </Button>
        </Box>
      </Grid>
      <CommentList comments={product.comments} productId={product.id} />

      <EditProduct
        setIsOpen={setIsEditModalOpen}
        isOpen={isEditModalOpen}
        product={product}
      />
    </Container>
  );
};

export default ProductPage;
