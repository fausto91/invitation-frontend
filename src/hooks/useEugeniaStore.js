import { useDispatch, useSelector } from "react-redux"
import { onAddNewInvite, onDeleteInvite, onLoadInvite, onSetActiveInvite } from "../store";
import eugeniaApi from "../api/eugeniaApi";
import Swal from "sweetalert2";


export const useEugeniaStore = () => {

    const dispatch = useDispatch();
    const { invitations, activeInvite } = useSelector(state => state.invitation);
    const { user } = useSelector( state => state.auth);

    const setActiveInvite = ( eugeniaInvite ) => {
      dispatch( onSetActiveInvite(eugeniaInvite) )
    }

    const startSavingInvite = async(eugeniaInvite) => {

      try {
        const { data } = await eugeniaApi.post('invitation/new', eugeniaInvite );
        dispatch( onAddNewInvite({...eugeniaInvite, id: data.invite.id, user }))
        Swal.fire('Registro exitoso', 'Invitación creada con exito' , 'success');
        
      } catch (error) {
        Swal.fire('Error', error.response.data?.message || error.message, 'error');
      }

    }

    const startDeletingInvite = async (id) => {
        try {

       const { data }= await eugeniaApi.delete(`invitation/${id}` );
          dispatch( onDeleteInvite({id}));
          Swal.fire('Eliminado', data.message , 'success');
          
        } catch (error) {
          Swal.fire('Error', error.response.data?.message || error.message, 'error');
        }

    }

    const startLoadingInvitations = async() => {
      try {
        const { data } = await eugeniaApi.get('/invitation');
        dispatch( onLoadInvite(data.invite))
      } catch (error) {
        Swal.fire('Error', error.response.data?.message || error.message, 'error');
      }
    }



  return {
    invitations,
    activeInvite,
    hasInviteSelected: !!activeInvite, 
    setActiveInvite,
    startSavingInvite,
    startDeletingInvite,
    startLoadingInvitations,


  }

}
