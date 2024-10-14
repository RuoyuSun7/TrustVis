import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const styles = {
  appBar: {
    backgroundColor: '#3747ac', // Customize the background color
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  paper: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    flexGrow: 1,
  },
};

const Header: React.FC = () => {
  return (
    <Grid item xs={12}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <Typography variant="h4" component="h1" style={styles.title}>
            TrustVis
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;
