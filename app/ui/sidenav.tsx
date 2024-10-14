import NavLinks from '@/app/ui/nav-links';
import { Grid, Paper } from '@mui/material';

export default function SideNav() {
  return (
    <Grid container direction="column" className="h-full px-2 py-4 md:px-2">
      <Grid item container direction={{ xs: 'row', md: 'column' }} className="grow space-x-2 md:space-x-0 md:space-y-2">
        <Grid item xs={12} md="auto">
          <NavLinks />
        </Grid>
      </Grid>
    </Grid>
  );
}
