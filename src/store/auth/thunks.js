//Los thunks son acciones que puedo hacer dispath
//pero estas acciones internamente tienen una tarea asincrona

import { loginWithEmailPassword, logoutFirebase, registerUserEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"


//Este thunk es el que tengo que disparar
//el lado de mi formulario
export const checkinAuthentication = (email, password) => {
    return async(dispath) => {
        dispath ( checkingCredentials() );
    }
};

export const startGoogleSingIn = () => {
    return async(dispatch) => {
        dispatch( checkingCredentials());

        const result =await signInWithGoogle();

        if ( !result.ok ) return dispatch( logout(result.errorMessage));

        dispatch( login(result) );
    }
};


export const startCreatingUserWithEmailPassword = ({email,password,name,lastName}) => {

    return async( dispatch ) => {
        dispatch(checkingCredentials());
        const displayName = `${name + ' ' + lastName}`;
        const { ok,uid,photoURL,errorMessage } = await registerUserEmailPassword({email,password,displayName});
        if(!ok) return dispatch( logout({errorMessage}) );
        
        dispatch( login({uid,displayName,email,photoURL}));
    }
}

export const startLoginWithLoginPassword = ({email,password}) => {

    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({email,password});
        console.log(result);
        if(!result.ok) return dispatch( logout(result) );

        dispatch( login (result) );
    };
}

export const startLogout = () => {
    return async(dispath) => {
        await logoutFirebase();

        dispath( logout() );
    }
}