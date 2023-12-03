import React, { useState, ChangeEvent, useCallback } from "react";
import {
  Avatar,
  Card,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useDarkMode } from "@/contexts/DarkModeContext";

interface AddPostCardProps {
  //   avatarSrc: string; // URL or path to the avatar image
}

const AddPost: React.FC<AddPostCardProps> = () => {
  const { theme } = useDarkMode();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<FileWithPath | null>(null);

  const handleTextFieldClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // Reset any temporary state when the dialog is closed
    setPostContent("");
    setUploadedImage(null);
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // For simplicity, this example assumes only one image is uploaded
    const image = acceptedFiles[0];
    setUploadedImage(image);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handlePostContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleAddPost = () => {
    // Handle adding the post with postContent and uploadedImage
    // You may want to send this data to a server or update your state accordingly.
    console.log("Post Content:", postContent);
    console.log("Uploaded Image:", uploadedImage);
    handleDialogClose(); // Close the dialog after handling the post
  };

  return (
    <>
      <Card sx={{ maxWidth: "90vw", width: 600, m: 1.5 }}>
        <Box p={1} display="flex" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: `${theme.palette.primary.main}` }}>
            סמ
          </Avatar>
          <TextField
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: 10,
              },
            }}
            multiline
            fullWidth
            autoFocus={false}
            defaultValue="הוספת פוסט חדש"
            inputProps={{ readOnly: true }}
            onClick={handleTextFieldClick}
          />
        </Box>
      </Card>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <Box
          sx={{
            p: 1,
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DialogTitle sx={{ mb: 0, pb: 0 }}>הוספת פוסט חדש</DialogTitle>
          <TextField
            margin="normal"
            label="תוכן הפוסט"
            fullWidth
            multiline
            value={postContent}
            onChange={handlePostContentChange}
          />
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>כדי להעלות תמונה שיש לגרור לתיבה או ללחוץ עליה.</p>
          </div>
          {uploadedImage && (
            <div>
              <p>Uploaded Image:</p>
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
          <Button
            sx={{ m: 1 }}
            variant="contained"
            color="primary"
            onClick={handleAddPost}
          >
            פירסום הפוסט
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

const dropzoneStyle: React.CSSProperties = {
  width: "100%",
  border: "2px dashed #aaaaaa",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  margin: 1,
};

export default AddPost;
