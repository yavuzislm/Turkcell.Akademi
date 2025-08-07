import Box from '@mui/material/Box';
import turkcellImage from './turkcell.jpg';

export default function AuthBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${turkcellImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}
