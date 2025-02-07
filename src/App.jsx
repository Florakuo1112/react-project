import { useRef, useState } from 'react'
import axios  from 'axios';
import { useEffect } from 'react';
import { Modal } from 'bootstrap';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultTempProduct=
{
    imageUrl:"https://fakeimg.pl/300/",
    title:"",
    category:"",
    unit:"",
    origin_price:0,
    price:0,
    description:"",
    content:"",
    is_enabled:false,
    imagesUrl:[""]
  };

function App() {
  //useState area
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  }); 
  const [products, setProducts] = useState([]); //初始值為空陣列
  const [tempProduct, setTempProduct] = useState(defaultTempProduct); //productModal初始值
  //useRef area
  const isAuthRef = useRef(false);
  const productModalRef = useRef(null);
  const myProductModalRef = useRef(null);
  const delProductModalRef = useRef(null);
  const myDelProductModalRef = useRef(null);
  const productModalStatus = useRef(null);
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
  //建立modal實例
    useEffect(()=>{
      myDelProductModalRef.current = new Modal(delProductModalRef.current,{backdrop:false});
      myProductModalRef.current = new Modal(productModalRef.current,{backdrop:false});
    },[])



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
  async function getAllProducts(){
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      console.log(res);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  //建立新的產品
  async function createProduct(){
    try {
      const data = tempProduct;
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`,{data});
      console.log(res);
      await getAllProducts();
      closeProductModal();
    } catch (error) {
      console.log(error);
    }
  };

  //刪除產品
  async function deleteProduct(id){
    try {
      const res = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`)
      console.log(res);
      await getAllProducts();
      closeDeletProductModal();
    } catch (error) {
      console.log(error);
    }
  };
  //修改產品
  async function editProduct(id){
    try {
      const data = tempProduct;
      const res = await axios.put(`${API_BASE}/api/${API_PATH}/admin/product/${id}`,{data});
      console.log(res);
      await getAllProducts();
      closeProductModal();
    } catch (error) {
      console.log(error);
    }
  }

    //新增編輯產品資料productModal
    function openProductModal(status, item){
      if(status === "create"){
        productModalStatus.current = "create";
        setTempProduct(defaultTempProduct)
      }else if (status === "edit"){
        productModalStatus.current = "edit"
        setTempProduct(item)
      };
      myProductModalRef.current.show();
    };
    function closeProductModal(){
      document.querySelector('#isEnabled').checked= false;
      myProductModalRef.current.hide();
    };

  //productModal input
  function handleProductModalInputChange(e){
    const {value, name, checked, type} = e.target;
  //   let editObj = {
  //     [name]:type === "number" ? Number(value): value,
  //     [name]:type === "checkbox" ? checked: value,

  // };這樣寫會被覆蓋ex{is_enabled:on,is_enabled:true}
  let editObj = {};
  if(type === "number"){
    editObj[name] = Number(value);
  }else if(type === "checkbox"){
    editObj[name] = checked;
  }else{
    editObj[name] = value;
  };
    setTempProduct({
      ...tempProduct,
      ...editObj,
    });
  };
  //productModal add副圖
  function handleAddImgs(){
    console.log(tempProduct.imagesUrl);
    if(tempProduct.imagesUrl == undefined){
      setTempProduct({
        ...tempProduct,
        imagesUrl:[""]
      });
    };
    if(tempProduct.imagesUrl !== undefined && tempProduct.imagesUrl.length < 5 && tempProduct.imagesUrl[length-1] !== ""){
      const newImagesUrl = [...tempProduct.imagesUrl];
      newImagesUrl.push('');
      setTempProduct({
        ...tempProduct,
        imagesUrl:newImagesUrl
      });
    }
  };
  //productModal remove副圖
  function handleRemoveImgs(index){
    if(tempProduct.imagesUrl.length > 1){
      const newImagesUrl = [...tempProduct.imagesUrl]
      newImagesUrl.splice(index,1);
      setTempProduct({
        ...tempProduct,
        imagesUrl:newImagesUrl
      });
    }else{
      document.querySelector(`#imagesUrl-${index+1}`).value = "";
      setTempProduct({
        ...tempProduct,
        imagesUrl:[""]
      });
    }
  };

  //刪除產品資料Modal
  function openDeletProductModal(item){    
    setTempProduct(item);
    myDelProductModalRef.current.show();
  };
  function closeDeletProductModal(){
    myDelProductModalRef.current.hide();
  };

  return (
    <>
      {isAuthRef.current ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button type="button" className="btn btn-primary" onClick={()=>openProductModal('create')}>建立新的產品</button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.origin_price}</td>
                        <td>{item.price}</td>
                        <td>{item.is_enabled ? <span className="text-success">啟用</span> : <span>未啟用</span>}</td>
                        <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-outline-primary btn-sm"
                          onClick={()=>openProductModal('edit',item)}>編輯</button>
                          <button type="button" className="btn btn-outline-danger btn-sm" 
                          onClick={()=>openDeletProductModal(item)}>刪除</button>
                        </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">尚無產品資料</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
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
      )}
{/* {new, edit} */}
<div id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
ref={productModalRef}>
  <div className="modal-dialog modal-dialog-centered modal-xl">
    <div className="modal-content border-0 shadow">
    {JSON.stringify(tempProduct)}
      <div className="modal-header border-bottom">

        <h5 className="modal-title fs-4">{productModalStatus.current === 'create'  ? "新增產品":"編輯產品"}</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={()=>closeProductModal()}
        ></button>
      </div>

      <div className="modal-body p-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="mb-4">
              <label htmlFor="primary-image" className="form-label">
                主圖
              </label>
              <div className="input-group">
                <input
                  name="imageUrl"
                  type="text"
                  id="primary-image"
                  className="form-control"
                  placeholder="請輸入圖片連結"
                  value={tempProduct.imageUrl}
                  onChange={handleProductModalInputChange}
                />
              </div>
              <img
                src={tempProduct.imageUrl}
                alt={tempProduct.title}
                className="img-fluid"
              />
            </div>

            {/* 副圖 */}
            <div className="border border-2 border-dashed rounded-3 p-3">
              {tempProduct.imagesUrl?.map((image, index) => (
                <div key={index} className='mb-2' >
                  <label
                    htmlFor={`imagesUrl-${index + 1}`}
                    className="form-label"
                  >
                    副圖 {index + 1}<br/>
                    {`imgurl${image}`}
                  </label>
                  <input
                    id={`imagesUrl-${index + 1}`}
                    type="text"
                    placeholder={`圖片網址 ${index + 1}`}
                    className="form-control mb-2"
                    onChange={(e)=>{
                      const newArray = [...tempProduct.imagesUrl];
                      newArray[index] = e.target.value;
                      setTempProduct({
                        ...tempProduct,
                        imagesUrl:newArray
                      })
                    }}
                  />
                  {image && (
                    <img
                      src={image}
                      alt={`副圖 ${index + 1}`}
                      className="img-fluid mb-2"
                    />
                  )}
                  <br />
                  <button type="button" className="btn btn-warning" onClick={()=>{handleRemoveImgs(index)}} >移除圖片</button>
                </div>
              ))}
              <button type="button" className="btn btn-success" onClick={()=>handleAddImgs()} >新增圖片</button>
            </div>
            
            
          </div>

          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                標題{tempProduct.title}
              </label>
              <input
                name="title"
                id="title"
                type="text"
                className="form-control"
                placeholder="請輸入標題"
                value={tempProduct.title}
                onChange={handleProductModalInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                分類{tempProduct.category}
              </label>
              <input
                name="category"
                id="category"
                type="text"
                className="form-control"
                placeholder="請輸入分類"
                value={tempProduct.category}
                onChange={handleProductModalInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="unit" className="form-label">
                單位{tempProduct.unit}
              </label>
              <input
                name="unit"
                id="unit"
                type="text"
                className="form-control"
                placeholder="請輸入單位"
                value={tempProduct.unit}
                onChange={handleProductModalInputChange}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <label htmlFor="origin_price" className="form-label">
                  原價
                </label>
                <input
                  name="origin_price"
                  id="origin_price"
                  type="number"
                  className="form-control"
                  placeholder="請輸入原價"
                  value={tempProduct.origin_price}
                  onChange={handleProductModalInputChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="price" className="form-label">
                  售價{tempProduct.price}
                </label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  className="form-control"
                  placeholder="請輸入售價"
                  value={tempProduct.price}
                  onChange={handleProductModalInputChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                產品描述{tempProduct.description}
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                rows={4}
                placeholder="請輸入產品描述"
                value={tempProduct.description}
                onChange={handleProductModalInputChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                說明內容{tempProduct.content}
              </label>
              <textarea
                name="content"
                id="content"
                className="form-control"
                rows={4}
                placeholder="請輸入說明內容"
                value={tempProduct.content}
                onChange={handleProductModalInputChange}
              ></textarea>
            </div>

            <div className="form-check">
              <input name="is_enabled"
                type="checkbox"
                className="form-check-input"
                id="isEnabled"
                checked={tempProduct.is_enabled}
                onChange={(e)=>{console.log(e.target.checked);handleProductModalInputChange(e);}}
              />
              <label className="form-check-label" htmlFor="isEnabled">
                是否啟用 {tempProduct.is_enabled}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer border-top bg-light">
        <button type="button" className="btn btn-secondary" onClick={()=>closeProductModal()}>
          取消
        </button>
        <button type="button" className="btn btn-primary" 
        onClick={()=>productModalStatus.current == 'create'? createProduct(): editProduct(tempProduct.id)}>
          確認
        </button>
      </div>
    </div>
  </div>
</div>
{/* {deleteModal} */}
<div className="modal" tabIndex="-1" ref={delProductModalRef} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">刪除產品</h5>
        <button type="button" className="btn-close" 
        onClick={()=>closeDeletProductModal()}></button>
      </div>
      <div className="modal-body">
        <p>請確認是否要刪除:{tempProduct.title}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>closeDeletProductModal()}>取消</button>
        <button type="button" className="btn btn-danger" onClick={()=>deleteProduct(tempProduct.id)}>確認刪除</button>
      </div>
    </div>
  </div>
</div>


    </>
  );
}


export default App
