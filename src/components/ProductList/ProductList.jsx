import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard/ProductCard";
import { Grid, Typography, Box } from "@mui/material";
import { fetchProducts } from "../../services/products";

const ProductsList = ({ sortBy }) => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>

      <Grid container>
        {sortedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function sortProducts(products, sortBy) {
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortBy === "alphabet") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "count") {
      return b.count - a.count;
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return sortedProducts;
}

export default ProductsList;
