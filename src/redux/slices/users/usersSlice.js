import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    isAdmin: false
};

export const initialErrors = {
    username: '',
    password: '',
    email: ''
};


export const usersSlice = createSlice({
    name: 'users',

    initialState: {
        users: [],
        paginator: {},
        errors: initialErrors
    },

    reducers: {
        addUser: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ];
        },
        setAllUsers: (state, action) => {
            state.users = action.payload.content
            state.paginator = action.payload
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map( u => {
                if (u.id == action.payload.id) return {
                    ...action.payload
                };
                return u;
            });
        },
        setErrors: (state, action) => {
            state.errors = action.payload
        }
    }
});

// return de functions, those functions change the state.
export const {addUser, setAllUsers, removeUser, updateUser, setErrors} = usersSlice.actions;