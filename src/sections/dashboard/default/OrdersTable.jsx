import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

function createData(ders_kodu, ders_ismi, kredi, ders_akts, ders_status) {
  return { ders_kodu, ders_ismi, kredi, ders_akts, ders_status };
}

const rows = [
  createData("CEN121", 'Computer Programming I', 4, 7, 40570),
  createData("EEE119", 'Electrical and Electronics Engineering Materials', 3, 4, 180139),
  createData("MATH111", 'Calculus I', 5, 6, 90989),
  createData("PHYS101", 'Physics I', 4, 6, 10239),
  createData("EEE102", 'Circuit Theory I', 4, 7, 83348),
  createData("MATH113", 'Linear Algebra', 3, 4, 410780),
  createData("HIS101", 'Advanced English I', 3, 3, 70999),
  createData("MATH112", 'Calculus II', 5, 6, 10570),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'ders_kodu',
    align: 'left',
    disablePadding: false,
    label: 'Ders Kodu'
  },
  {
    id: 'ders_ismi',
    align: 'left',
    disablePadding: true,
    label: 'Ders Adı'
  },
  {
    id: 'kredi',
    align: 'center',
    disablePadding: false,
    label: 'Kredi'
  },
  {
    id: 'ders_akts',
    align: 'center',
    disablePadding: false,
    label: 'AKTS'
  },
  {
    id: 'ders_status',
    align: 'center',
    disablePadding: false,
    label: 'Onay Durumu'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center', display: 'inline-flex' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'tracking_no';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary">{row.ders_kodu}</Link>
                  </TableCell>
                  <TableCell align="left">{row.ders_ismi}</TableCell>
                  <TableCell align="center">{row.kredi}</TableCell>
                  <TableCell align="center">{row.ders_akts}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={row.ders_status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
