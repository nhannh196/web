import axios from "axios";

//  export const getTokenForAxios = ()=>{
//     console.log(localStorage.getItem('accessToken'))
//     return localStorage.getItem('accessToken')
// }
// const accessToken=getTokenForAxios()

export const baseURL = 'https://localhost:7053'
export const axiosInstance = axios.create(
  {
    baseURL: baseURL,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json' // Có thể thay đổi tùy theo API yêu cầu
    }
  });

// export const axiosInstanceCookie = axios.create(
//   {
//     baseURL: baseURL,
//     "maxBodyLength": Infinity,
//     headers: {
//       'Cookies': `${document.cookie}`
//     }
//   })