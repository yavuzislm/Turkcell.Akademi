// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';

import axios from 'axios';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// SearchBarBasic Komponenti
export function SearchBarBasic({ onSearch }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const term = q.trim();
    if (!term) return;

    setSubmitted(term);
    setLoading(true);
    setError(''); //Errorlar tekrarlıyordu. Tekrardan almamak için boş stringe ayarlamam gerektiğini okudum.
    setDescription(''); // Aynı error gibi eski bilgiler döndürdüğü oluyordu.
    setOpen(true);
    onSearch?.(term);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/logs/search', { 
        q: term, 
        ts: Date.now() 
      });
      
      console.log('Arama başarılı:', response.data); // İncelerken hata alıyor muyum diye ekledim.
      
      if (response.data && response.data.description) {
        setDescription(response.data.description);
      } else {
        setDescription('Ders açıklaması bulunamadı.');
      }
      
    } catch (err) {
      console.error('Arama hatası:', err);
      
      if (err.response && err.response.status === 404) {
        setError('Ders bulunamadı. Lütfen farklı bir terimle arayın.');
      } else {
        setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          border: '1px solid #ccc', 
          borderRadius: 12, 
          padding: '8px 12px', 
          width: 360
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ders kodu veya adı..."
          style={{ 
            flex: 1, 
            border: 'none', 
            outline: 'none', 
            fontSize: 14, 
            background: 'transparent' 
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation 
          disabled={loading}
          sx={{
            bgcolor: '#111',
            color: 'common.white',
            textTransform: 'none',
            borderRadius: 2,
            px: 1.5,
            minHeight: 36,
            transition: 'background-color 120ms ease',
            '&:hover, &:active, &:focus-visible': {
              bgcolor: '#363636ff'
            },
            '&:disabled': {
              bgcolor: 'grey.400'
            }
          }}
        >
          {loading ? 'Aranıyor...' : 'Ara'}
        </Button>
      </form>

      {/* Popup Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ 
          sx: {
            borderRadius: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }
        }}
      >
        <DialogTitle sx={{ pt: 3, pb: 1 }}>
          <Typography variant="h5">{submitted.toUpperCase()}</Typography>
        </DialogTitle>

        <DialogContent 
          dividers 
          sx={{ 
            pt: 2, 
            pb: 2, 
            '&.MuiDialogContent-dividers': { 
              borderTop: 'none', 
              borderBottom: 'none' 
            } 
          }}
        >
          {error ? (
            <Box>
              <Typography variant="body1" color="error" sx={{ mb: 2 }}> 
                {error}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mevcut dersler için ders listesini kontrol edebilirsiniz.
              </Typography>
            </Box>
          ) : description ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Ders İçeriği:
              </Typography>
              <Typography variant="body1" sx={{ 
                backgroundColor: '#f5f5f5', 
                padding: 2, 
                borderRadius: 2,
                lineHeight: 1.6
              }}>
                {description}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Ders bilgisi bulunamadı.
            </Typography>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button
            sx={{
                border: 'none',
                background: '#1d8535ff',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                '&:hover': {
                  background: '#0c5218aa',
                  color: '#fff',
                }
              }}
          >Ekle
          </Button>

          <Button
            sx={{
              border: 'none',
              background: '#b41010ff',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              '&:hover': {
                background: '#920f0fb9',
                color: '#fff',
              }
            }}
          >
            Çıkar
          </Button>

          <Button
            sx={{
              border: 'none',
              background: '#111',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              '&:hover': {
                background: '#333',
              }
            }}
            onClick={() => {
              setOpen(false);
              setQ(''); // KUTUYA BASTIKTAN SONRA ÇIKARSAM TEMİZLESİN DİYE..
            }} 
            variant="contained"
          >
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const handleSearch = (term) => {
    console.log('Arama terimi:', term);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Sales" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
      </Grid>
      
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      
      {/* row 2 - Search Bar */}
      <Grid size={12}>
        <SearchBarBasic onSearch={handleSearch} />
      </Grid>
      
      {/* row 3 - Ders Listesi */}
      <Grid size={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h5">Ders Listesi</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      
      {/* row 4 */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <SaleReportCard />
      </Grid>
      
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid />
        </Grid>
        
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                px: 2,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
            </ListItem>
            
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
            </ListItem>
            
            <ListItem
              component={ListItemButton}
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
            </ListItem>
          </List>
        </MainCard>
        
        <MainCard sx={{ mt: 2 }}>
          <Stack sx={{ gap: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}