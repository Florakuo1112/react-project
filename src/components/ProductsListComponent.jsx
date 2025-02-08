import { useRef, useState } from 'react'
import axios  from 'axios';
import { useEffect } from 'react';
import { Modal } from 'bootstrap';
 
import PaginationComponent from '../components/PaginationComponent';
import DeleteModalComponent from '../components/DeleteModalComponent';
import ProductModalComponent from '../components/ProductModalComponent';

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

function ProductsListComponent({
    API_BASE, 
    API_PATH,
    products,
    pageRef,
    getAllProducts

}){
    //useState area
    const [tempProduct, setTempProduct] = useState(defaultTempProduct); //productModal初始值
    //useRef area
    const productModalRef = useRef(null);
    const myProductModalRef = useRef(null);
    const delProductModalRef = useRef(null);
    const myDelProductModalRef = useRef(null);
    const productModalStatus = useRef(null);//判斷是新增還是編輯
    const imageUrlRef = useRef(null);//放回傳的file url
    const imageUrlStatus = useRef(null);//判斷是主圖還是副圖

    //建立modal實例
    useEffect(()=>{
    myProductModalRef.current = new Modal(productModalRef.current,{backdrop:false});
    myDelProductModalRef.current = new Modal(delProductModalRef.current,{backdrop:false});
    },[])

    //Function
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
      document.querySelector('#isEnabled').checked= false;
      myProductModalRef.current.hide();
    };

  //productModal input
    function handleProductModalInputChange(e){
        const {value, name, checked, type} = e.target;
        console.log(value, name, checked,type);
    //   let editObj = {
    //     [name]:type === "number" ? Number(value): value,
    //     [name]:type === "checkbox" ? checked: value,

    // };這樣寫會被覆蓋ex{is_enabled:on,is_enabled:true}
    let editObj = {};
    if(type === "number"){
        editObj[name] = Number(value);
    }
    else if(type === "checkbox"){
        editObj[name] = checked;
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
      error.response.data.message.message,
      error.message
      )
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
    //pagination
    function handlePagination(page){
        console.log('handlePagination trigged', page)
        getAllProducts(page);
    }
    
    return(
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
              <div className='d-flex justify-content-center'>
              <PaginationComponent pageRef={pageRef} handlePagination={handlePagination}/>
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

        </div>
    )
};

export default ProductsListComponent;