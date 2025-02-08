import {  useState } from 'react';
import axios  from 'axios';
function LoginPageComponent({checkLogin, API_BASE, API_PATH}){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      }); 
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
        e.preventDefault(); //要透過表單觸發submit的話，要使用e.preventDefault(),取消form表單的預設行，避免submit直接觸發
        try {
        const res = await axios.post(`${API_BASE}/admin/signin`, formData) //axios.post(’’,{body},{header})
        console.log(res.data.message);
        const {token, expired} = res.data;
        document.cookie = `loginToken=${token}; expires=${new Date(expired)};path=/`
        axios.defaults.headers.common['Authorization'] = token;
        checkLogin();
        } catch (error) {
        console.log(error)
        }
    };
    return(
        <div className="container login">
          {JSON.stringify(formData)}
          <div className="row justify-content-center">
            <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
            <div className="col-8">
              <form id="form" className="form-signin" onSubmit={login} >
                <div className="form-floating mb-3">
                <label htmlFor="username">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                    onChange ={handleInput}
                    name = "username"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-floating">
                <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name = "password"
                    onChange ={handleInput}
                    required
                  />
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
    )
};

export default LoginPageComponent;