import * as React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const styles = {
  footer: {
    backgroundColor: '#3747ac', // Customize the background color
  },
}

export default function Footer() {
  return (
    <Box sx={{ color: 'white', py: 3, mt: 5 }} style={styles.footer}>
      <Grid item xs={12} md={12} className="text-center">
        <Typography variant="body1">
          © {new Date().getFullYear()} TrustVis
        </Typography>
      </Grid>
    </Box>
  );
};
