import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from '@/app/ui/sidenav';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Grid, Paper, Typography } from '@mui/material';
import Footer from "./ui/footer";
import Header from "./ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrustVis",
  description: "TrustVis",
};

const styles = {
  paper: {
    padding: 16,
    color: 'text.secondary',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
              <Header />
              <Grid item xs={12} sm={2}>
                <Paper>
                  <SideNav />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Paper style={styles.paper}>
                  {children}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Footer />
              </Grid>
            </Grid>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
