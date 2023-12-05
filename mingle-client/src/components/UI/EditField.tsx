// components/EditField.tsx
import React, { useState } from "react";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

interface EditFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

const EditField: React.FC<EditFieldProps> = ({ label, value, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onSave(editedValue);
    setEditMode(false);
  };

  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold">
        {label}:
      </Typography>
      <Box display="flex" alignItems="center" width="100%">
        {editMode ? (
          <>
            <TextField
              variant="standard"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              fullWidth
            />
            <IconButton color="primary" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="subtitle1">{value}</Typography>
            <IconButton onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
  );
};

export default EditField;
