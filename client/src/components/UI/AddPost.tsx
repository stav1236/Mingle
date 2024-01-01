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
import mingleAxios from "@/utilities/axios";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

const AddPost = () => {
  const { user } = useAuth();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<FileWithPath | null>(null);

  const handleTextFieldClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setPostContent("");
    setUploadedImage(null);
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
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

  const handleAddPost = async () => {
    const formData = new FormData();
    formData.append("text", postContent);
    formData.append("image", uploadedImage!);

    try {
      await mingleAxios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPostContent("");
      setUploadedImage(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    handleDialogClose();
  };

  return (
    <>
      <Card sx={{ maxWidth: "90vw", width: 600, m: 1.5 }}>
        <Box p={1} display="flex" alignItems="center">
          <UserAvatar {...user} sx={{ m: 1 }} />
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
