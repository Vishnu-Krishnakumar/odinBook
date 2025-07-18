import { io } from "socket.io-client";

const url = "http://localhost:3000";

export const socket = io(url,{
    autoConnect:true,
    withCredentials: true,
    // auth:{
    //     token: localStorage.getItem("authToken")
    // }
});