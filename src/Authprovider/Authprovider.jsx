import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider } from "firebase/auth";
import usePublicAxios from "../Hooks/usePublicAxios";
import auth from "../Firebase/Firebase.int";



export const AuthContext = createContext(null)

const Authprovider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = usePublicAxios()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleEntry = () => {
        return signInWithPopup(auth, provider)
    }
    const entryUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const userUpdateProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            const userinfo = {
                email: user?.email,
            }
            if (auth.currentUser) {
                axiosPublic.post('/jwt', userinfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false)
                        }
                    })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        // localStorage.removeItem('access-token')
        return () => {
            unsubscribe();
        }

    }, [axiosPublic])

    const info = {
        user,
        loading,
        logOut,
        createUser,
        googleEntry,
        entryUser,
        userUpdateProfile
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>

    );
};

Authprovider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default Authprovider;