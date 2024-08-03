import { useAuth } from "./auth/hooks/useAuth";
import LoginPage from "./auth/pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeRoutes from "./routes/HomeRoutes";


function AppRoutes() {
    
    /** Settings */
    // title Form
    const titleLogin = 'Sistema de Información Mr.Machine🖥️';

    const {login} = useAuth();

    return(<>
        {/** conditionals about login */}
        <Routes>
            {login.isAuth == true ? 
                (<>
                    <Route path="/*" element={<HomeRoutes />} />
                </>) 
            :   
                (<>
                    <Route path="/login" element={<LoginPage title={titleLogin} />}/>
                    <Route path="/*" element={<Navigate to={"/login"} />}/> 
                </>)
            }
        </Routes>
    </>);
}
export default AppRoutes;