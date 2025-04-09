import Layout from "./Layout"
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { createBrowserRouter,Route,createRoutesFromElements,RouterProvider, Navigate } from "react-router"
import toast, { Toaster } from "react-hot-toast";   
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import Home from "./pages/Home"
import CreateElection from "./pages/CreateElection"
import Nfts from "./pages/Nfts";
import Support from "./pages/Support";
import CastVote from "./pages/CastVote"
import Profile from "./pages/Profile";
function App() {
  
 
  
  const {data:authUser,isLoading} = useQuery({   
    queryKey:["authUser"],    //by this key we can fetch this same data in any component by just writing - const {data:authUser,isLoading} = useQuery({queryKey:["authUser"]}); and now we hot the same data in authUser. querykey meinkcuh bhi likh sakte hai ha. in usequrey we have data as the default variable 
    queryFn:async () =>{
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;        //now this res.data will be stored in data:authUser
      } catch (error) {
        console.log("error",error);
      
         if(error && error?.status===401){
          return null;
         }
         toast.error("Something went wrong please try again later");        
      }
    }
    
  });
    
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={authUser? <Home/>:<Navigate to={"/login"}/>} />
        <Route path="login" element={!authUser ?<Login/>:<Navigate to={"/"}/>}/>
        <Route path="signup" element={!authUser?<Signup/>:<Navigate to={"/"}/>}/>
        <Route path="create" element={authUser?<CreateElection/>:<Navigate to={"/login"}/>}/>
        <Route path="election/:id" element={authUser?<CastVote/>:<Navigate to={"/login"}/>}/>
        <Route path="nfts" element={authUser?<Nfts/>:<Navigate to={"/login"}/>}/>
        <Route path="support" element={authUser?<Support/>:<Navigate to={"/login"}/>}/>
        <Route path="profile" element={authUser?<Profile/>:<Navigate to={"/login"}/>}/>
        
      </Route>
    )
  );


  return (
    <>
    {isLoading ? null :<RouterProvider router={router}/>} 
    <Toaster /> 
    </>
  )
  //we send null in user when we are getting the user info bec if he is not login and goes on home page and website is taking time to check the user is login or not at that loading time also he doesnt see the home page  
}

export default App
