import { useEffect } from "react";
import {useNavigate} from 'react-router'

function NotFoundView(){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },1000)
    },[]);
    return(
        <>
        <h1>404</h1>
        </>
    )
};

export default NotFoundView;