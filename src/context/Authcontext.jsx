import { createRefhildren, createContext, useState, useContext, useEffect } from "react";

import { toast } from "react-toastify";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    




    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            profile(token);
        }
        // else {
        //     setLoading(false);
        // }



    }, []);





    const login = async (email, password) => {
        console.log(email, password);

        try {
            const res = await fetch("http://localhost:3000/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();
            setUser(data.user)
            localStorage.setItem('token', data.token)
            if (!res.ok) {
                toast.error(data.message || "invailid user");
                return;
            }

            toast.success("login succesful")

        } catch (error) {
            console.log(error)
        }
    }

    const register = async (username, email, password) => {
        console.log(username, "username");
        console.log(email, "email");
        console.log(password, "password");
        try {
            const res = await fetch("http://localhost:3000/api/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await res.json();
            setUser(data.user)
            localStorage.setItem('token', data.token)

               if (!res.ok) {
                toast.error(data.message || "invailid user");
                return;
            }

            toast.success("registerastion succesful")
        } catch (error) {
            console.log(error)
        }
    }



    const profile = async (token) => {
        try {

            const res = await fetch('http://localhost:3000/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json();
            setUser(data.user);


        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        setUser(null);                     
        localStorage.removeItem("token"); 
    };











    return (
        <AuthContext.Provider value={{ user, setUser, login, register, profile, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);