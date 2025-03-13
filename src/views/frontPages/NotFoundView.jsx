import { useEffect } from "react";
import {useNavigate} from 'react-router'

function NotFoundView(){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },3000)
    },[]);
    return(
        <>
        <div className="container">
        <div className="row d-flex align-items-center py-5">
            <div className="col-md-4 col-12 fs-4">
            <h1 class="py-5 fw-bolder">404 未找到頁面</h1>
            <p class="lh-lg">很抱歉，我們無法找到您所要求的頁面。
            <br />
            這可能是由於鏈接已過期、頁面已移除，或者您輸入的網址有誤。
            <br />
            請嘗試檢查您的網址是否正確輸入，
            <br />
            我們將會把網站重導至首頁。
            </p>
            </div>
            
            <img className="col-md-8 col-12 " src="../../../public/404.png" alt="" />

        </div>
        </div>

        </>
    )
};

export default NotFoundView;