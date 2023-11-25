import { Box, Typography, useMediaQuery } from "@mui/material";

const GreetingMessage = () => {
  const isDesktop = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: `${isDesktop ? "" : "center"}`,
      }}
    >
      <Typography variant="h2" color="primary">
        MINGLE
      </Typography>
      <Typography color="text.primary" variant="h5">
        מינגל היא רשת חברתית המאפשרת
      </Typography>
      <Typography color="text.primary" variant="h5">
        שיתוף רגשות עם הקרובים אליך.
      </Typography>
      {!isDesktop && (
        <>
          <br />
          <br />
        </>
      )}
    </Box>
  );
};

export default GreetingMessage;
