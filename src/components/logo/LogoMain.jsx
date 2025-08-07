// material-ui
import { useTheme } from '@mui/material/styles';
import siyahLogo from './siyah1.png'; // dikkat: doğru dosya adı

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <img
      src={siyahLogo}
      alt="Logo"
      width={60}
      height={60}
      style={{
        objectFit: 'contain',
        marginLeft: '60px',   // sola yaklaşır
        marginTop: '10px',    // yukarı yaklaşır
        position: 'relative', // margin uygulanabilsin diye
      }}
    />
  );
}
