import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { openConfirm } from "../../store/confirmSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      openConfirm({
        question: `Are you sure you want to delete ${product.name}?`,
        productId: product.id,
      })
    );
  };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Link to={`/${product.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageUrl}
          alt={product.name}
        />
      </Link>

      <CardContent>
        <Link to={`/${product.id}`}>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          Count: {product.count}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {product.size.width} x {product.size.height} mm
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {product.weight}
        </Typography>
        <Button onClick={handleDelete}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
