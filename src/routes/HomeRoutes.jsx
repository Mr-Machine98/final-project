import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutUsPage } from "../pages/AboutUsPage";
import { CartItem } from "../pages/CartItem";
import { Userspage } from "../pages/UsersPage";
import { UserForm } from "../components/UserForm";
import { useAuth } from "../auth/hooks/useAuth";


export default function HomeRoutes() {

    const {login} = useAuth();

    return(<>
        <Routes>
            <Route path="home" element={<HomePage />}/>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="about-us" element={<AboutUsPage />}/>
            {!login.isAdmin || <>
                <Route path="users/register" element={<UserForm />} />
                <Route path="users/edit/:id" element={<UserForm />} />
            </>}
            <Route path="cart" element={<CartItem />}/>
            <Route path="users" element={<Userspage />}/>
            <Route path="users/page/:page" element={<Userspage />}/>
        </Routes>
    </>);
}