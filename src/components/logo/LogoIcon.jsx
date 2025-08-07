// material-ui
import { useTheme } from '@mui/material/styles';
import siyahLogo from './siyah1.png'; // doğru import

// ==============================|| LOGO ICON IMAGE ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <img
      src={siyahLogo}          // BURASI ÖNEMLİ
      alt="Logo"
      width={210}
      height={48}
      style={{ objectFit: 'contain' }}
    />
  );
}
