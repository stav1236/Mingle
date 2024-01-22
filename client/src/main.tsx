import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { DarkModeProvider } from "./contexts/DarkModeContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const theme = createTheme({
  direction: "rtl",
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <DarkModeProvider>
            <AuthProvider>
              <div dir="rtl">
                <App />
              </div>
            </AuthProvider>
          </DarkModeProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
