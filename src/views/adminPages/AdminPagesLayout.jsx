import {useState, useRef, useEffect} from 'react'
import {NavLink, Outlet, useNavigate} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'bootstrap';
import LoginToastComponent from '../../components/LoginToastComponent';
import AdminProductStatusMessageToastComponent from '../../components/AdminProductStatusMessageToastComponent';
import LoadingComponent from '../../components/LoadingComponent';
import { fetchLoginStatus, logoutAction} from '../../slice/loginStatusSlice';

// API_PATH
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminPagesLayout(){
    //useState
    const [loading, setLoading] = useState(false);
    //useRef
    const loginToastRef = useRef(null);
    const myLoginToastRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus =  useSelector((state) => state.loginStatus.isLogin)

    //useEffect area
    //for init 確認登入狀態
    useEffect(() => {
      setLoading(true);
      myLoginToastRef.current = Toast.getOrCreateInstance(loginToastRef.current);
      dispatch(fetchLoginStatus()).finally(() => {
        showLoginToast();
        setLoading(false);
        loginStatus == false && navigate('/login');
      });
    }, [loginStatus]);

    //Function
    function logout(e){
      e.preventDefault(); 
      dispatch(logoutAction());
    };

    function showLoginToast(){
      myLoginToastRef.current.show();
    };

    function closeLoginToast(){
      myLoginToastRef.current.hide();
    };
    return(
        <>
        <div className="container">
        {loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>}
        <nav>
            <NavLink to='../'>Front Page</NavLink> | 
            <a href='#' onClick={(e)=>{logout(e)}}>登出</a>
        </nav>
        <h2>後台管理</h2>
        <Outlet></Outlet>

        <LoginToastComponent loginToastRef={loginToastRef} loginStatus={loginStatus} 
        closeLoginToast={closeLoginToast}></LoginToastComponent>
        <AdminProductStatusMessageToastComponent></AdminProductStatusMessageToastComponent>
        </div>
        </>
    )
};

export default AdminPagesLayout;
