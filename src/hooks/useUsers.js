import { useDispatch, useSelector } from "react-redux";
import { addUser, initialErrors, initialUserForm, removeUser, setAllUsers, setErrors, updateUser } from "../redux/slices/users/usersSlice";
import { findAll, findAllPages, remove, save, update } from "../service/usersService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../auth/hooks/useAuth";

export function useUsers() {

    const {
        users,
        paginator,
        errors
    } = useSelector( state => state.users );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {doLogout} = useAuth();

    const findAllUsers = async (page = 0) => {
        const users = await findAllPages(page);
        dispatch(setAllUsers(users));
    }

    const handlerGoToAddUser = () => navigate("/users/register");

    const handlerAddOrUpdateUser = async (user) => {

        const {id, username, password, email, isAdmin} = user;
        let response;

        try {
            if (id === 0) {
                response = await save({username, password, email, isAdmin});
                dispatch(addUser(response.data));
            } else {
                response = await update(user, user.id);
                dispatch(updateUser(response.data));
            }
            // alert 
            Swal.fire({
                title: (user.id === 0) ? "Usuario Creado" : "Usuario Actualizado",
                text: (user.id === 0) ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!",
                icon: "success"
            });
            dispatch(setErrors(initialErrors));
            navigate("/users");
        } catch (error) {
            console.log(error);
            if (error.response && error.response?.status == 400) {
                console.error(error.response.data);
                dispatch(setErrors(error.response.data));
                setTimeout(() => {
                    dispatch(setErrors(initialErrors));
                }, 5000);
            } else if (error.response.data?.message?.includes("users_email_key") ) {
                dispatch(setErrors({email: 'The email already exists'}));
                setTimeout(() => {
                    dispatch(setErrors(initialErrors));
                }, 5000);
            } else if (error.response.data?.message?.includes("users_username_key") ) {
                dispatch(setErrors({username: 'The username already exists'}));
                setTimeout(() => {
                    dispatch(setErrors(initialErrors));
                }, 5000);
            } else if (error.response?.status == 500) {
                Swal.fire({
                    title: "Espera un momento!",
                    text: "Error en el servidor, contacta con un técnico si persiste el error.",
                    icon: "error"
                });
            } else if (error.response?.status == 401) {
                Swal.fire({
                    title: "Sesión expirada...",
                    text: "Lo sentimos, la sesión ha expirado.",
                    icon: "info"
                });
                doLogout();
            } else {
               throw error;
            }
        }
    };

    const handlerDeleteUser = (id) => {
        // alert
        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado el usuario sera elminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeUser(id));
                    Swal.fire({
                        title: "Usuario Eliminado!",
                        text: "El usuario ha sido eliminado con exito.",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response?.status == 401) {
                        Swal.fire({
                            title: "Sesión expirada...",
                            text: "Lo sentimos, la sesión ha expirado.",
                            icon: "info"
                        });
                        doLogout();
                    }
                }
            }
        });
    };

    return {
        users,
        paginator,
        errors,
        initialUserForm,
        findAllUsers,
        handlerGoToAddUser,
        handlerAddOrUpdateUser,
        handlerDeleteUser
    };
}