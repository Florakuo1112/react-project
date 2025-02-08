import { useRef, useState } from 'react'
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

  //useRef area
  const isAuthRef = useRef(false);
  const pageRef = useRef(null); //放pagination info

  //useEffect area
  //for init
    useEffect(()=>{
      console.log('init');
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      ); //找到cookie裡的loginToken後的第一個
      axios.defaults.headers.common['Authorization'] = token;
      checkLogin()
    },[]);
    
  //Function
  //確認登入
  async function checkLogin(){
    try {
      const res = await axios.post(`${API_BASE}/api/user/check`);
      console.log(res.data);
      isAuthRef.current = true;
      await getAllProducts();
    } catch (error) {
      isAuthRef.current = false;
      console.log(error);
      alert(error.response.data.message)
    }
  };
  
  //取得所有產品資料
  async function getAllProducts(page=1){
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`);
      console.log(res);
      setProducts(res.data.products);
      pageRef.current = res.data.pagination;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isAuthRef.current ? (
        <ProductsListComponent
        API_BASE={API_BASE}
        API_PATH={API_PATH}
        products={products}
        pageRef={pageRef}
        getAllProducts={getAllProducts}
        />
      ) : (
        <LoginPageComponent checkLogin={checkLogin} API_BASE={API_BASE} API_PATH={API_PATH}/>
      )}
    </>
  );
}

export default App;
