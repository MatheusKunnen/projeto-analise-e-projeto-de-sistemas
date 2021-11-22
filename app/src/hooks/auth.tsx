import React, { createContext, useState, useContext, useEffect } from 'react';
import UserService from '../services/UserService';
import PersonService from '../services/PersonService';
import api from '../services/api';

interface User{
    user_id: number;
    person_id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
}

interface UserResponse {
    id_pessoa: number;
    id_usuario: number;
    alias: string;
    ativo: boolean;
    createdAt: string;
    updatedAt: string;
}

interface PersonResponse {
    id_pessoa: number;
    nome: string;
    sobrenome: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextData{
    user: User | null;
    signIn(email: string, password:string): Promise<Boolean>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider:React.FC = ({ children }) =>  {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem('user');
        const auth = localStorage.getItem('authorization');
        if(storagedUser && auth)
        {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.common['Authorization'] = auth;
        }
    }, []);

    async function signIn(username: string, password:string): Promise<Boolean>{
        api.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ':' + password)}`;

        const response: UserResponse = await UserService.login(username, password);
        if(!response.id_usuario) return false;
        
        const loggedIn = await PersonService.get(username, password, response.id_pessoa)
            .then((res: PersonResponse) => {
                const temporaryUser = {
                    user_id: response.id_usuario,
                    person_id: response.id_pessoa,
                    username: response.alias,
                    name: res.nome,
                    surname: res.sobrenome,
                    email: res.email,
                }
                setUser(temporaryUser);
                localStorage.setItem('user', JSON.stringify(temporaryUser));
                localStorage.setItem('authorization', `Basic ${btoa(username + ':' + password)}`);
                return true;
            })
            .catch(err => {
                console.log(err);
                return false;
            })

        if(!loggedIn) {
            api.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('user');
            localStorage.removeItem('authorization');
            setUser(null);
        }
        return loggedIn;
    }

    function signOut(){
        api.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('user');
        localStorage.removeItem('authorization');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut}}>
            { children }
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}