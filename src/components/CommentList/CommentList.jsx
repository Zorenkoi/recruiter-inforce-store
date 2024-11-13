import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  List,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComments } from "../../services/products";

const CommentList = ({ productId, comments }) => {
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  const { mutate: updateCommentsMutation } = useMutation({
    mutationFn: (newComments) => updateComments(productId, newComments),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setCommentText("");
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
    },
  });

  const handleSubmit = () => {
    if (!commentText) return;

    const newComment = {
      productId,
      id: Date.now(),
      description: commentText,
      date: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, newComment];

    updateCommentsMutation(updatedComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    updateCommentsMutation(updatedComments);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <List>
        {comments.map((comment) => (
          <Card key={comment.id} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.secondary">
                      {comment.date}
                    </Typography>
                  }
                  secondary={comment.description}
                />
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <DeleteOutline />
                </IconButton>
              </ListItem>
            </CardContent>
            <Divider />
          </Card>
        ))}
      </List>

      <TextField
        label="New Comment"
        multiline
        rows={3}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        fullWidth
        variant="outlined"
      />

      <Button variant="contained" onClick={handleSubmit}>
        Add Comment
      </Button>
    </div>
  );
};

export default CommentList;
