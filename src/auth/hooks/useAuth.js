import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogin, onLogout } from "../../redux/slices/auth/authSlice";
import Swal from 'sweetalert2';
import "@sweetalert2/theme-bootstrap-4";
import { loginUser } from "../services/authServices";

/**
 * This function hook managements the state about authentication
 * besides it makes a query to database for attempt  of log in.
 * @returns {object} it returns an object with params like login: {user, isAdmin, isAuth}, doLogin, doLogout
 * @example
 *      {
 *          login: { user, isAdmin, isAuth },
 *          doLogin,
 *          doLogout
 *      }
 */
export function useAuth() {

    // this hook changes the state about authentication user
    const dispatch = useDispatch();
    const {user, isAdmin, isAuth} = useSelector( state => state.auth );
    const navigate = useNavigate();

    /**
     * This function tries to make log in with variable userLogin.
     * @param {object} userLogin is the user with params like username and password
     */
    const doLogin = async (userLogin) => {
        try {

            const response = await loginUser(userLogin);
            const token = response.token;
            const payload = JSON.parse(window.atob(token.split(".")[1]));

            let userData = { username: payload.username, isAdmin: payload.isAdmin};
            
            dispatch(onLogin(userData));

            Swal.fire({
                title: `Has iniciado sesión ${response.username}`,
                text: "Presiona el botón para continuar o clic por fuera del anuncio!",
                icon: "success",
                confirmButtonText: "Entrar",
                confirmButtonColor: "#2185d0"
            });

            // keep session
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user: userData,
                isAdmin: payload.isAdmin
            }));

            // here it needs the token
            // sessionSto....
            sessionStorage.setItem('token', `Bearer ${token}`);

            //here it needs navigate to another route
            navigate("/home");

        } catch (error) {
            console.error(error);
            if (error.response?.status == 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error, username o password incorrectos!",
                });
            } else if (error.response?.status == 403) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error, no tienes acceso al recurso o permisos!",
                });
            } else if (error.response?.status == 500) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error, con el servidor!",
                });
            } else {
                throw error;
            }
        }
    };

    /**
     * This function closes the conection and log out. 
     */
    const doLogout = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    };

    return {
        login: { user, isAdmin, isAuth },
        doLogin,
        doLogout
    }
}