import {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios  from 'axios';
import LoadingComponent from '../../components/LoadingComponent';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function LoginView(){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      }); 
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
    
    //useEffect area
    //for init
    useEffect(()=>{
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      ); //找到cookie裡的loginToken後的第一個
      axios.defaults.headers.common['Authorization'] = token;
      checkLogin();
  },[]);
  
    //Function
    async function checkLogin(){
      setLoading(true);
      try {
        const res = await axios.post(`${API_BASE}/api/user/check`);
        console.log('確認登入', res.data);
        navigate('/admin/products')
      } catch (error) {
        console.log('確認登入失敗', error);
        alert('登入失敗', error.response.data.message);
        navigate('/login')
      }
      finally{
        setLoading(false);
      }
    };
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
        e.preventDefault(); //要透過表單觸發submit的話，要使用e.preventDefault(),取消form表單的預設行，避免submit直接觸發
        try {
        const res = await axios.post(`${API_BASE}/admin/signin`, formData) //axios.post(’’,{body},{header})
        console.log(res.data.message);
        const {token, expired} = res.data;
        document.cookie = `loginToken=${token}; expires=${new Date(expired)};path=/`
        axios.defaults.headers.common['Authorization'] = token;
        navigate('/admin/products')
        } catch (error) {
        console.log(error);
        alert('登入失敗')
        }finally{
          setLoading(false);
        }
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
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
        </>
    )
};

export default LoginView;