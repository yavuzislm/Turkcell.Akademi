import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

export default function AuthCard({ children, ...other }) {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        maxWidth: { xs: 350, sm: 420, md: 420 },   // Genişlik dengeli
        minWidth: { xs: 320, sm: 380, md: 400 },   // Minimum genişlik
        margin: { xs: 2.5, md: 4 },                // Ortalamak için üstten/ alttan boşluk
        backgroundColor: '#fff',                   // Tam beyaz arka plan
        borderRadius: '12px',                      // Hafif yuvarlak köşe
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)', // Hafif gölge
        border: '1px solid #f0f0f0',               // Açık gri kenarlık
        position: 'relative',
        overflow: 'hidden'
      }}
      content={false}
      {...other}
      border={false}
      boxShadow
      shadow={theme.customShadows.z1}
    >
      <Box sx={{
        p: { xs: 2, sm: 4, md: 5 },               // İç boşluk
        minHeight: { xs: 'auto', sm: '420px', md: '440px' }, // Yükseklik dengeli
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </Box>
    </MainCard>
  );
}

AuthCard.propTypes = { children: PropTypes.any, other: PropTypes.any };