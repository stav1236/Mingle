import { Box, Divider, useMediaQuery } from "@mui/material";
import GreetingMessage from "../components/Auth/GreetingMessage/GreetingMessage";
import AuthSection from "../components/Auth/AuthSection/AuthSection";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { nonTokenAxios } from "@/utilities/axios";

const Auth = () => {
  const { clearAuth } = useAuth();
  const isDesktop = useMediaQuery("(min-width:1000px)");
  useEffect(() => {
    clearAuth();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await nonTokenAxios.get("/crypto");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "wrap",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: `${isDesktop ? "center" : ""}`,
        alignContent: `${isDesktop ? "" : "center"}`,
      }}
    >
      <GreetingMessage />
      {isDesktop && (
        <Divider
          flexItem
          orientation="vertical"
          sx={{ borderRightWidth: 2, m: 10 }}
        />
      )}
      <AuthSection />
    </Box>
  );
};

export default Auth;
