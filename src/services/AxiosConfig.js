import axios from "axios";

//  export const getTokenForAxios = ()=>{
//     console.log(localStorage.getItem('accessToken'))
//     return localStorage.getItem('accessToken')
// }
// const accessToken=getTokenForAxios()
export const baseURL = "https://6618-1-53-195-148.ngrok-free.app";
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json", // Có thể thay đổi tùy theo API yêu cầu
  },
});
