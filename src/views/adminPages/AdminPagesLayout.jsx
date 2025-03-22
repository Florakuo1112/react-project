import {useState, useRef, useEffect} from 'react'
import { Outlet, useNavigate} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'bootstrap';
import LoginToastComponent from '../../components/LoginToastComponent';
import AdminProductStatusMessageToastComponent from '../../components/AdminProductStatusMessageToastComponent';
import LoadingComponent from '../../components/LoadingComponent';
import AdminHeaderComponent from '../../components/AdminHeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import AdminSideBarComponent from '../../components/AdminSideBarComponent'
import { fetchLoginStatus} from '../../slice/loginStatusSlice';


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
    function showLoginToast(){
      myLoginToastRef.current.show();
    };

    function closeLoginToast(){
      myLoginToastRef.current.hide();
    };
    return(
        <>
        {loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>}
        {/* <AdminHeaderComponent></AdminHeaderComponent> */}
        <div  className='d-flex'>
          <AdminSideBarComponent></AdminSideBarComponent>
          <div className='container'style={{marginLeft:"300px"}}>
            <div className='d-flex align-items-center py-3'>
              <h2 className='playwrite-it-moderna me-1'>Caliwoof Pet Hotel</h2><h5>家裏窩寵物旅館訂單系統後台 </h5>
            </div>
            <Outlet></Outlet>
          </div>
        </div>
        {/* <FooterComponent ></FooterComponent> */}
        {/* 吐司 */}
        <LoginToastComponent loginToastRef={loginToastRef} loginStatus={loginStatus} 
        closeLoginToast={closeLoginToast}></LoginToastComponent>
        <AdminProductStatusMessageToastComponent></AdminProductStatusMessageToastComponent>

        </>
    )
};

export default AdminPagesLayout;
