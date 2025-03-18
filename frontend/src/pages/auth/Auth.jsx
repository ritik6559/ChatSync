import React, {useState} from 'react';
import Background from '@/assets/login2.png'
import Victory from '@/assets/victory.svg'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx"
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {toast} from "sonner";
import apiClient from "@/lib/api-client.js";
import {LOGIN_ROUTE, SIGNUP_ROUTE} from "@/utils/constants.js";
import {useNavigate} from "react-router-dom";
import {useAppStore} from "@/store/index.js";

const Auth = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { setUserInfo } = useAppStore()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const validateSignUp = () => {

        if(!email.length || !password.length || !confirmPassword.length){
            toast.error("All fields are required");
            return false;
        }

        if(password !== confirmPassword){
            toast.error("Password must match!");
            return false;
        }
        return true
    }

    const validateLogin = () => {

        if(!email.length || !password.length ){
            toast.error("All fields are required");
            return false;
        }
        return true
    }

    const handleLogin = async () => {
        if(validateLogin()){
            const response = await apiClient.post(LOGIN_ROUTE, {
                email, password
            });

            if(response.data.user.id){
                if(response.data.user.profileSetup){
                    navigate("/chat")
                } else {
                    navigate("/profile")
                }
                toast.success("Login successfully!");
                setUserInfo(response.data.user);
            } else {
                toast.error("Something went wrong!");
            }
        }
    }

    const handleSignUp = async () => {
        if(validateSignUp()){
            const response = await apiClient.post(SIGNUP_ROUTE, {
                email, password
            });

            if(response.status === 201){
                navigate("/profile");
                toast.success("Signed up successfully!");
                setUserInfo(response.data.user);
            } else {
                toast.error("Something went wrong!");
            }
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center" >
          <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-xl grid xl:grid-cols-2 items-center justify-center" >
              <div className="flex flex-col gap-10 items-center justify-center" >
                  <div className="flex flex-col items-center justify-center" >
                      <div className="flex items-center justify-center" >
                          <h1 className={"text-5xl font-bold md:text-6xl"} >Welcome</h1>
                          <img src={Victory}  className={"h-[100px]"} />
                      </div>
                      <p className={"font-medium text-center"} >Fill in the details to get started</p>
                  </div>
                  <div className={"flex items-center justify-center w-full"} >
                      <Tabs className="w-3/4" defaultValue={"login"} >
                          <TabsList className="bg-transparent rounded-none w-full" >
                              <TabsTrigger
                                  value="login"
                                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full
                                    data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300
                                "
                              >
                                  Login
                              </TabsTrigger>

                              <TabsTrigger
                                  value="signup"
                                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full
                                    data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300
                                "
                              >
                                  Signup
                              </TabsTrigger>
                          </TabsList>
                          <TabsContent
                              className="flex flex-col mt-10 gap-5"
                              value="login"
                          >
                                <Input
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={"rounded-full p-6"}
                                />

                              <Input
                                  placeholder="Password"
                                  name="password"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className={"rounded-full p-6"}
                              />

                              <Button
                                  className={"rounded-full p-6"}
                                  onClick={handleLogin}
                              >
                                  Login
                              </Button>


                          </TabsContent>
                          <TabsContent
                              className="flex flex-col gap-5"
                              value="signup"
                          >
                              <Input
                                  placeholder="Email"
                                  name="email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className={"rounded-full p-6"}
                              />

                              <Input
                                  placeholder="Password"
                                  name="password"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className={"rounded-full p-6"}
                              />

                              <Input
                                  placeholder="Confirm Password"
                                  name="password"
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  className={"rounded-full p-6"}
                              />

                              <Button
                                  className={"rounded-full p-6"}
                                  onClick={handleSignUp}
                              >
                                  Signup
                              </Button>
                          </TabsContent>
                      </Tabs>
                  </div>
              </div>

              <div className="hidden  xl:flex justify-center items-center" >
                  <img
                      src={Background}
                      alt="Background login"
                      className={"h-[700px]"}
                  />
              </div>

          </div>
        </div>
    );
};

export default Auth;