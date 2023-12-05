import React from "react";
import { Typography, Avatar, Card, Box } from "@mui/material";
import EditField from "@/components/UI/EditField";

const ProfileSettings: React.FC = () => {
  const handleSave = (field: string, value: string) => {
    // Implement logic to save the edited value (e.g., make an API call)
    console.log(`Saving ${field}: ${value}`);
  };

  return (
    <Card
      sx={{
        p: 3,
        maxWidth: "90vw",
        width: 600,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography gutterBottom variant="h4">
          הגדרות פרופיל
        </Typography>
        <Avatar
          alt="Profile Picture"
          src="/path/to/your/profile/image.jpg"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <EditField
        label="First Name"
        value="John"
        onSave={(value) => handleSave("firstName", value)}
      />
      <EditField
        label="Last Name"
        value="Doe"
        onSave={(value) => handleSave("lastName", value)}
      />
      <EditField
        label="Email/Phone"
        value="john.doe@example.com"
        onSave={(value) => handleSave("emailPhone", value)}
      />
      <EditField
        label="Password"
        value="********"
        onSave={(value) => handleSave("password", value)}
      />
      <EditField
        label="Birth Date"
        value="01/01/1990"
        onSave={(value) => handleSave("birthDate", value)}
      />
      <EditField
        label="Gender"
        value="Male"
        onSave={(value) => handleSave("gender", value)}
      />
    </Card>
  );
};

export default ProfileSettings;
