import { Raleway } from "next/font/google";
import "./globals.css";
import { theme } from "../helpers/theme";
import { UiTriggersProvider } from "@/context/UiTriggersContext";
import { SectionProvider } from "@/context/SectionContext";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import StoreProvider from "./StoreProvider";
import SnackbarProviders from "./SnackbarProvider";
import Loader from "@/components/Loader";
import AuthContext from "@/context/AuthContext";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "EazziMe",
  description: "Easy wage access",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={raleway.className}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <CssBaseline />
            <StoreProvider>
            <UiTriggersProvider>
                <SnackbarProviders>
              <SectionProvider>
                  <Loader />
                  <AuthContext>
                    <Box>{children}</Box>
                  </AuthContext>
              </SectionProvider>
                </SnackbarProviders>
            </UiTriggersProvider>
            </StoreProvider>
          </Box>
        </body>
      </ThemeProvider>
    </html>
  );
}
