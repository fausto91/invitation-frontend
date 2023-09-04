import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"

export const EugeniaApp = () => {
  return (
   <BrowserRouter>
      <AppRouter/>
   </BrowserRouter>
  )
}
