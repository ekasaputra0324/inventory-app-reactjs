import { useState } from "react";


//function useToken
export default function useToken(){
    /*
    getToken() di gunakan untuk menangkap data yang telah
    di kirimkan oleh server yang ada di backend dari proses login 
    dan di parse ke dalam string 
    */ 
    function getToken(){
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }
    /*
    useState() di gunakan untuk 
    menyimpan token yang telah di dapat dari getToken
    */ 
    const [token , setToken] = useState(getToken());
     /*
    saveToken() di gunakan untuk 
    menyimpan token yang telah di dapat dari getToken dan
    di simpan ke dalam localStorage
    */
    const saveToken = userToken =>{
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    }
    
    return {
        setToken: saveToken, token
    }
}