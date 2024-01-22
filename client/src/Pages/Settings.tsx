import React, { useCallback, useState } from "react";
import { Typography, Card, Box, Dialog, Button } from "@mui/material";
import EditField from "@/components/UI/EditField";
import mingleAxios from "@/utilities/axios";
import { useAuth } from "@/contexts/AuthContext";
import User from "@/models/User";
import UserAvatar from "@/components/UI/UserAvatar";
import { GENDERS } from "@/models/Gender";
import { FileWithPath, useDropzone } from "react-dropzone";

const ProfileSettings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<FileWithPath | null>(null);

  const handleDialogClose = () => {
    setDialogOpen(false);
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

  const handleSave = async (field: string, value: string) => {
    if (value) {
      const res = await mingleAxios.put(`/users/${field}/${value}`);
      if (res.status === 200 && field !== "password") {
        updateUser(res.data as User);
      }
    }
  };

  const handleUploadAvatar = async () => {
    const formData = new FormData();
    formData.append("image", uploadedImage!);

    try {
      const res = await mingleAxios.post("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        updateUser(res.data as User);
      }

      setUploadedImage(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    handleDialogClose();
  };

  return (
    <>
      <Card
        sx={{
          p: 3,
          maxWidth: "90vw",
          width: 600,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h4">
            הגדרות פרופיל
          </Typography>
          <UserAvatar
            {...user}
            onClick={() => setDialogOpen(true)}
            sx={{ width: 100, height: 100, fontSize: 40 }}
          />
        </Box>
        <EditField
          label="שם פרטי"
          value={user?.firstName ?? ""}
          onSave={(value) => handleSave("firstName", value)}
        />
        <EditField
          label="שם משפחה"
          value={user?.lastName ?? ""}
          onSave={(value) => handleSave("lastName", value)}
        />
        <EditField
          label="אמייל"
          value={user?.email ?? ""}
          onSave={(value) => handleSave("email", value)}
        />
        <EditField
          isPassword
          label="סיסמא"
          value="********"
          onSave={(value) => handleSave("password", value)}
        />
        <EditField
          isDate
          label="תאריך לידה"
          value={user?.birthDate?.toLocaleString() ?? ""}
          onSave={(value) => handleSave("birthDate", value)}
        />
        <EditField
          value={user?.gender}
          options={Object.values(GENDERS)}
          label="מגדר"
          onSave={(value) => handleSave("gender", value)}
        />
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
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>כדי להעלות תמונה שיש לגרור לתיבה או ללחוץ עליה.</p>
          </div>
          {uploadedImage && (
            <div>
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded"
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
          <Button
            sx={{ m: 1 }}
            variant="contained"
            color="primary"
            onClick={handleUploadAvatar}
          >
            החלפת תמונת פרופיל
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

export default ProfileSettings;
