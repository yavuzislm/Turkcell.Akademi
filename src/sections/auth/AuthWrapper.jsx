import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// project imports
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <AuthBackground />
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Grid sx={{ px: 3, mt: 3 }} size={12}>
          <Logo to="/" />
        </Grid>
        <Grid size={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ 
              minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 132px)' },
              padding: { xs: 2, sm: 3 }
            }}
          >
            <Grid>
              <AuthCard>
                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 'bold', 
                    color: 'text.primary',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                  }}>
                    Giriş
                  </Typography>
                </Box>
                {children}
              </AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ p: 3 }} size={12}>
          <AuthFooter /> 
        </Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
