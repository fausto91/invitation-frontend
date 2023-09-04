import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPages, RecoveryAccountPage, RegisterPages, ResetPassword } from "../auth"
import { EugeniaPages } from "../eugenia"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"
import { Box, CircularProgress } from "@mui/material"



export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken(); 
  }, [])
  

  if ( status === 'checking' ) {
    return (
      <Box sx={{top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', }} >
          <CircularProgress />
      </Box>
    )
  }
  return (
    <Routes> 

      {
        ( status === 'not-authenticated'
          ? (
            <>
              <Route path="/auth/login/*" element={<LoginPages/>}/>
              <Route path="/auth/reset-password/*" element={<ResetPassword/>}/>
              <Route path="/*" element={<Navigate to="/auth/login"/>}/>
            </>

          )
          :(
            <>
              <Route path="/" element={<EugeniaPages/>}/>
              <Route path="/*" element={<Navigate to="/"/>}/>
            
            </>

          )

        )

      }
         <Route path="/auth/sigup/*" element={<RegisterPages/>}/>
         <Route path="/auth/recovery-account/*" element={<RecoveryAccountPage/>}/>
         

    </Routes>

  )
}
