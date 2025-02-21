import {  useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import LoadingComponent from '../../components/LoadingComponent';
import LoginToastComponent from '../../components/LoginToastComponent'
import { Toast } from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginStatus, loginAction} from '../../slice/loginStatusSlice';

function LoginView(){
    //useState
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      }); 
    const [loading, setLoading] = useState(false);
    //useRef
    const loginToastRef = useRef(null);
    const myLoginToastRef = useRef(null);
    //其他方法
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus =  useSelector((state) => state.loginStatus.isLogin)
    //useEffect area
    //for init 確認登入狀態
    useEffect(() => {
      setLoading(true);
      myLoginToastRef.current = Toast.getOrCreateInstance(loginToastRef.current);
      dispatch(fetchLoginStatus()).finally(()=>{
        showLoginToast();
        setLoading(false);
        loginStatus == true && navigate('/admin/products')
      });
    }, [loginStatus]);
    
    useEffect(()=>{
      if(!loading){
          document.body.style.overflow = 'auto' ;
      }
    },[loading]);

    //Function
    //input登入帳號密碼
    function handleInput(e){
        const {name} = e.target;
        setFormData({
        ...formData,
        [name]:e.target.value
        })
    };
    //登入
    async function login(e){
        setLoading(true);
        e.preventDefault(); 
        //要透過表單觸發submit的話，要使用e.preventDefault(),取消form表單的預設行，避免submit直接觸發
        dispatch(loginAction(formData)).finally(()=>{
          setLoading(false);
          loginStatus == true && navigate('/admin/products')
        })
    };

    function showLoginToast(){
      myLoginToastRef.current.show();
  };
  
    function closeLoginToast(){
        myLoginToastRef.current.hide();
    };

    return(<>
    {
      loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
    }
        <div className="login">
          <div className="row justify-content-center">
            <div className="col-8">
            <h1 className="h3 mb-3 font-weight-normal ">請先登入</h1>
              <form id="form" className="form-signin" onSubmit={login} >
                <div className="form-floating mb-3">                
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                    onChange ={handleInput}
                    name = "username"
                    required
                    autoFocus/>
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name = "password"
                    onChange ={handleInput}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-primary w-100 mt-3"
                  type="submit">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>

        <LoginToastComponent loginToastRef={loginToastRef} loginStatus={loginStatus}
       closeLoginToast={closeLoginToast}></LoginToastComponent>

        </>
    )
};

export default LoginView;