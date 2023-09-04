import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Save from '@mui/icons-material/Save';
import { addHours, differenceInSeconds } from 'date-fns';
import { useEugeniaStore } from '../../hooks/useEugeniaStore';


const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CreateModal = () => {
  const { activeInvite, startSavingInvite } = useEugeniaStore();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const [formValues, setFormValues] = useState({
    guestName: '',
    entryDate: new Date(),
    dateExpiry: addHours(new Date(), 2)

  });
  
  useEffect(() => {
    if ( activeInvite !== null ){
        setFormValues({ ...activeInvite });
    }
  

}, [ activeInvite ])

  const onInputChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    })
}

const onDateChanged = (event, changing) => {
  setFormValues({
      ...formValues,
      [changing]: event
  })
}

const onSubmitForm = async (event) => {
  event.preventDefault();
  const difference = differenceInSeconds(  formValues.dateExpiry, formValues.entryDate );
  if (isNaN(difference) || difference <= 0) {;
    return;
  }
  await startSavingInvite( formValues );
  handleClose()

}



  return (
    <div>
      <Button onClick={handleOpen}>Crear nueva invitación</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={onSubmitForm}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
            Crear una invitación
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ingrese los datos para poder generar una nueva invitación.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="guestName"
            label="Nombre del invitado que ingresará"
            name="guestName"
            value={formValues.guestName}
            onChange={onInputChange}
          >
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                 <DatePicker
                  label="Fecha y hora de entrada"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  value={formValues.entryDate}
                  onChange={(event) => onDateChanged(event, 'entryDate')}
                  format="Pp"
                  
                  />
                 <DatePicker
                  label="Fecha de caducidad"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  minDate={formValues.entryDate}
                  value={formValues.dateExpiry}
                  onChange={(event) => onDateChanged(event, 'dateExpiry')}
                  format="Pp"
                  />
         </LocalizationProvider>
         <Grid>
                <Button
                    type="submit"
                    variant="outlined" 
                    startIcon={<Save />}
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Crear
                </Button>
         </Grid>

        </Box>
      </Modal>
    </div>
  );
}