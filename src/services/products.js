import axios from "axios";
const BASE_URL = "http://localhost:5000/products";

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const fetchProductById = async (productId) => {
  const response = await axios.get(`${BASE_URL}/${productId}`);
  return response.data;
};

export const postProduct = async (newProduct) => {
  const response = await axios.post(`${BASE_URL}`, newProduct);
  return response.data;
};

export const updateProduct = async (product) => {
  const response = await axios.patch(`${BASE_URL}/${product.id}`, {
    name: product.name,
    imageUrl: product.imageUrl,
    count: product.count,
    weight: product.weight,
    size: product.size,
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const updateComments = async (productId, comments) => {
  const response = await axios.patch(`${BASE_URL}/${productId}`, {
    comments,
  });

  return response.data;
};
