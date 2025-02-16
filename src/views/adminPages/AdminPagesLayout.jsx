import {useState } from 'react'
import axios  from 'axios';
import { useEffect } from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminPagesLayout(){
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    //useEffect area
    //for init
      useEffect(()=>{
          console.log('admin init start');
          const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
          ); //找到cookie裡的loginToken後的第一個
          axios.defaults.headers.common['Authorization'] = token;
          checkLogin();
      },[]);
      
    //Function
    //確認登入
    async function checkLogin(){
      try {
        const res = await axios.post(`${API_BASE}/api/user/check`);
        console.log('確認登入', res.data);
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        console.log('確認登入失敗', error);
        alert('登入失敗', error.response.data.message);
        navigate('/Login')
      }
    };
    return(
        <>
        <div className="container">
        <nav>
            <NavLink to='../'>Front Page</NavLink>
        </nav>
        <h2>後台管理</h2>
        <Outlet></Outlet>
        </div>
        </>
    )
};

export default AdminPagesLayout;
