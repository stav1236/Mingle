import React from "react";
import { Typography, Card, Box } from "@mui/material";
import EditField from "@/components/UI/EditField";
import mingleAxios from "@/utilities/axios";
import { useAuth } from "@/contexts/AuthContext";
import User from "@/models/User";
import UserAvatar from "@/components/UI/UserAvatar";
import { GENDERS } from "@/models/Gender";

const ProfileSettings: React.FC = () => {
  const { user, updateUser } = useAuth();

  const handleSave = async (field: string, value: string) => {
    if (value) {
      const res = await mingleAxios.put(`/users/${field}/${value}`);
      if (res.status === 200 && field !== "password") {
        updateUser(res.data as User);
      }
    }
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
        <UserAvatar {...user} sx={{ width: 100, height: 100, fontSize: 40 }} />
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
  );
};

export default ProfileSettings;
