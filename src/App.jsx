import {useState } from 'react'
import axios  from 'axios';
import { useEffect } from 'react';
import LoginPageComponent from './components/LoginPageComponent';
import ProductsListComponent from './components/ProductsListComponent';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  //useState area
  const [products, setProducts] = useState([]); //初始值為空陣列
  const [isAuth, setIsAuth] = useState(false);
  const [pages, setPages] = useState({}); //放pagination info

  //useEffect area
  //for init
    useEffect(()=>{
        console.log('init start');
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
      await getAllProducts();
    } catch (error) {
      setIsAuth(false);
      console.log('確認登入失敗', error);
      alert('登入失敗', error.response.data.message)
    }
  };
  
  //取得所有產品資料
  async function getAllProducts(page=1){
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`);
      console.log('產品資料', res);
      setProducts(res.data.products);
      setPages(res.data.pagination);
    } catch (error) {
      console.log('產品資料取得錯誤',error);
    }
  };

  return (
    <>
      {isAuth ? (
        <ProductsListComponent
        API_BASE={API_BASE}
        API_PATH={API_PATH}
        products={products}
        pages={pages}
        setPages={setPages}
        getAllProducts={getAllProducts}
        />
      ) : (
        <LoginPageComponent checkLogin={checkLogin} API_BASE={API_BASE} API_PATH={API_PATH}/>
      )}
    </>
  );
}

export default App;
