import { Navigate, Route, Routes } from "react-router-dom"
import { TallerPage } from "../pages/TallerPage"
import { OrdersView } from "../views"

export const TallerRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<TallerPage/>}>
          <Route path="orders" element={<OrdersView />}/>
        </Route>
        <Route path="/*" element={<Navigate to="/dashboard" />}/>
    </Routes>
  )
}
