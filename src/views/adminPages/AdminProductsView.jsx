import { useRef, useState,useEffect } from 'react'
import axios  from 'axios';
import { Modal } from 'bootstrap';
 
import PaginationComponent from '../../components/PaginationComponent';
import DeleteModalComponent from '../../components/DeleteModalComponent';
import ProductModalComponent from '../../components/ProductModalComponent';
import LoadingComponent from '../../components/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { pushMessage } from '../../slice/adminProductStatusMessageSlice';

// API_PATH
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
    is_enabled:0,
    provide_delivery:0,
    imagesUrl:[""]
  };

function AdminProductsView(){
    //useState area
    const [products, setProducts] = useState([]); //初始值為空陣列
    const [pages, setPages] = useState({}); //放pagination info
    const [tempProduct, setTempProduct] = useState(defaultTempProduct); //productModal初始值
    const [loading, setLoading] = useState(false);
    //useRef area
    const productModalRef = useRef(null);
    const myProductModalRef = useRef(null);
    const delProductModalRef = useRef(null);
    const myDelProductModalRef = useRef(null);
    const productModalStatus = useRef(null);//判斷是新增還是編輯
    const imageUrlRef = useRef(null);//放回傳的file url
    const imageUrlStatus = useRef(null);//判斷是主圖還是副圖
    //其他
    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
      const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
          "$1",
        ); //找到cookie裡的loginToken後的第一個
      axios.defaults.headers.common['Authorization'] = token;
      getAllProducts();
    },[]);
    //建立modal實例
    useEffect(() => {
        myProductModalRef.current = new Modal(productModalRef.current,{backdrop:false});
        myDelProductModalRef.current = new Modal(delProductModalRef.current,{backdrop:false});
    },[]);
    useEffect(()=>{
      if(!loading){
          document.body.style.overflow = 'auto' ;
      }
  },[loading]);

  //funciton
  //取得所有產品資料
    async function getAllProducts(page=1){
      setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`);
            console.log('產品資料', res);
            setProducts(res.data.products);
            setPages(res.data.pagination);
        } catch (error) {
            console.log('產品資料取得錯誤',error);
        }finally{
          setLoading(false);
        }
        };

   //建立新的產品
    async function createProduct(){
      setLoading(true);
        try {
        const data = tempProduct;
        const res = await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`,{data});
        dispatch(pushMessage({
          text:res.data?.message,
          success:res.data.success
        }))
        await getAllProducts();
        closeProductModal();
        } catch (error) {
        dispatch(pushMessage({
          text:error.response?.data.message.join("、"),
          success:error.response?.data.success,
        }))
        }finally{
          setLoading(false);
        }
    };

  //刪除產品
    async function deleteProduct(id){
      setLoading(true);
        try {
        const res = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`)
        console.log(res);
        dispatch(pushMessage({
          text:res.data?.message,
          success:res.data.success
        }));
        await getAllProducts();
        closeDeletProductModal();
        } catch (error) {
          dispatch(pushMessage({
            text:error.response?.data.message.join("、"),
            success:error.response?.data.success,
          }));
        }finally{
          setLoading(false);
        }
    };
  //修改產品
    async function editProduct(id){
      setLoading(true);
        try {
        const data = tempProduct;
        const res = await axios.put(`${API_BASE}/api/${API_PATH}/admin/product/${id}`,{data});
        dispatch(pushMessage({
          text:res.data?.message,
          success:res.data.success
        }));
        await getAllProducts();
        closeProductModal();
        } catch (error) {
          dispatch(pushMessage({
            text:error.response?.data.message.join("、"),
            success:error.response?.data.success,
          }));
        }finally{
          setLoading(false);
        }
    }

    //開啟新增編輯產品資料productModal
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
    //開啟關閉編輯產品資料productModal
    function closeProductModal(){
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
    }
    else if(type === "checkbox"){
        editObj[name] = checked==true? 1:0 ;
    }
    else if(type === "file"){
        editObj['imageUrl'] = imageUrlRef.current;
    }
    else{
        editObj[name] = value;
    };
        setTempProduct({
        ...tempProduct,
        ...editObj,
        });
    };
  //圖片上傳功能
  async function handleFileChange(e, index) {
    try {
      console.log(e.target)
      const file = e.target.files[0];
      const formData = new FormData();  // Create a new FormData object
      formData.append("file-to-upload", file);  // Append the actual file
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData);
      console.log(res.data.imageUrl);
      imageUrlRef.current = res.data.imageUrl;
      if(imageUrlStatus.current == "main"){
        handleProductModalInputChange(e);       
      }else{
        handleInputImgUrls(e,index, true);
      };   
    } catch (error) {
      console.log(error);
      alert('上傳失敗:',
      error.response?.data.message.message,
      error.message
      )
    } finally{
      e.target.value = '';
    }
  };
  //productModal 副圖input事件
  function handleInputImgUrls(e,index, isFileInput){
    const newArray = [...tempProduct.imagesUrl];
    if(isFileInput == true){
      newArray[index] = imageUrlRef.current;
    }else{
      newArray[index] = e.target.value;
    };
    setTempProduct({
      ...tempProduct,
      imagesUrl:newArray
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

    return(
        <>
        {loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>}
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
              <div className='d-flex justify-content-center'>
              <PaginationComponent pages={pages} setPages={setPages} getAllProducts={getAllProducts}/>
              </div>
            </div>
          </div>

          {/* {new, edit} */}
        <ProductModalComponent
            productModalRef={productModalRef} 
            tempProduct={tempProduct} 
            productModalStatus={productModalStatus}
            closeProductModal={closeProductModal}
            handleProductModalInputChange={handleProductModalInputChange}
            handleRemoveImgs={handleRemoveImgs} 
            handleAddImgs={handleAddImgs} 
            createProduct={createProduct} 
            editProduct={editProduct}
            setTempProduct={setTempProduct}
            handleInputImgUrls={handleInputImgUrls}
            handleFileChange={handleFileChange}
            imageUrlStatus={imageUrlStatus}
            />

        {/* {deleteModal} */}
        <DeleteModalComponent 
        delProductModalRef={delProductModalRef} 
        closeDeletProductModal={closeDeletProductModal}
        tempProduct={tempProduct} 
        deleteProduct={deleteProduct}
        />
        </>
    )
};

export default AdminProductsView;