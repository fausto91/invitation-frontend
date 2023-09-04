import { useDispatch, useSelector } from "react-redux"
import { clearErrorMessage, onChecking, onLoging, onLogout, onRecovery, onRecoveryAccount } from "../store/auth/authSlice";
import eugeniaApi from "../api/eugeniaApi";
import Swal from "sweetalert2";

export const useAuthStore = () => {
    const { status, user, errorMessage, code } = useSelector( state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking());
        try {
            const { data } = await eugeniaApi.post('auth/user/singin', { email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({name: data.name, uid: data.uid}));
        } catch (error) {
            dispatch(onLogout(error.response.data?.message || 'Campos invalidos' ));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
            
        }

    }

    const startRegister = async({name, lastName, email, password, apartmentNumber}) => {
        dispatch( onChecking() );
        try {
            const { data } =  await eugeniaApi.post('auth/user/sigup', { name, lastName, email, password, apartmentNumber });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({name: data.name, uid: data.uid}));
            Swal.fire('Registro exitoso', 'ahora ya puede iniciar sesión', 'success');
            
        } catch (error) {
            dispatch(onLogout( error.response.data?.message || 'Campos obligatorios'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() ); 

        try {

            const {data} = await eugeniaApi.get('auth/user/update-token');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({name: data.name, uid: data.uid}));
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
            
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    const recoveryAccount = async ({ email }) => {
        try {
           const {data} = await eugeniaApi.post('auth/user/send-email-password',{ email });
           localStorage.setItem('code', data.data.reference );
            Swal.fire('Exitoso', data.message , 'success');
        } catch (error) {
            Swal.fire('Error', error.response.data?.message || error.message, 'error');
        }
    }
    const getCodeById = async () => {
        try {
           const getCode = localStorage.getItem("code");
           const {data} = await eugeniaApi.get(`auth/user/changepassword/code/${getCode}`);
           dispatch(onRecoveryAccount(data.code))

        } catch (error) {    
            Swal.fire('Error', error.response.data?.message || error.message, 'error');
        }
    }

     const resetPassword = async ({ password, confirmPassword }) => {
        try {
           const getCode = localStorage.getItem("code");
           const {data} = await eugeniaApi.patch(`auth/user/changepassword/code/${getCode}`,{ password, confirmPassword });
            Swal.fire('Exitoso', data.message , 'success');
        } catch (error) { 
            Swal.fire('Error', error.response.data?.message || error.message, 'error');
        }
    }


    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        recoveryAccount,
        getCodeById,
        resetPassword

    }
}