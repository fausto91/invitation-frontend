import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { QrCode2Outlined } from '@mui/icons-material';
import { useEugeniaStore } from '../../hooks/useEugeniaStore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  dayjs  from 'dayjs';



export const TableComponent = () => {
 const { invitations } = useSelector( state => state.invitation);
  const { startLoadingInvitations, startDeletingInvite, activeInvite, setActiveInvite } = useEugeniaStore();

  useEffect(()=> {
    startLoadingInvitations()
  },[])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="center">Nombre del invitado</TableCell>
            <TableCell align="center">Fecha y hora de entrada</TableCell>
            <TableCell align="center">Fecha y hora de caducidad</TableCell>
            <TableCell align="center">Ver código QR</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invitations.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"  align="center">
                {row.guestName}
              </TableCell>
              <TableCell align="center">{dayjs(row.entryDate).format('DD MMMM YYYY H:m:s')}</TableCell>
              <TableCell align="center">{dayjs(row.dateExpiry).format('DD MMMM YYYY H:m:s')}</TableCell>
              <TableCell align="center">
              <IconButton aria-label="QR"><QrCode2Outlined/></IconButton>
              </TableCell>
              <TableCell align="center">
              <IconButton onClick={ ()=> startDeletingInvite(row.id)} aria-label="delete"><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}