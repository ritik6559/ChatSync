import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "@/pages/auth/Auth.jsx";
import Chat from "@/pages/chat/Chat.jsx";
import Profile from "@/pages/profile/Profile.jsx";
import {useAppStore} from "@/store/index.js";
import {useState, useEffect} from "react";
import apiClient from "@/lib/api-client.js";
import {GET_USER_INFO} from "@/utils/constants.js";

const PrivateRoute = ({children}) => {
    const { userInfo} = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({children}) => {
    const { userInfo} = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/chat" /> : children ;
};

function App() {

    const [userInfo, setUserInfo] = useAppStore(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try{
                const response = await apiClient.get(GET_USER_INFO);

            } catch(e){
                console.error({e})
            }
        };
        if(!userInfo) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, [ userInfo, setUserInfo ]);

    if(loading){
        return <div>
            Loading...
        </div>
    }

    return (

        <BrowserRouter>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <AuthRoute>
                            <Auth />
                        </AuthRoute>

                    }
                />
                <Route
                    path="*"
                    element={ <Navigate to="/auth" />}  />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <Chat />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;