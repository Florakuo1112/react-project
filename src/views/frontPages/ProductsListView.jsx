import axios from 'axios';
import { useState,useRef ,useEffect } from 'react';
import { Modal } from 'bootstrap';
import PaginationComponent from '../../components/PaginationComponent';
import LoadingComponent from '../../components/LoadingComponent';
import ShowProductDetailModalComponent from '../../components/ShowProductDetailModalComponent';
import { Outlet, Link} from 'react-router';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsListView(){
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState({});
    const [tempProduct, setTempProduct] = useState({})
    const [addedProduct, setAddedProduct] = useState({qty:1});
    const [loading, setLoading] = useState(false);

    const singleProductRef = useRef(null);
    const mySingleProductRef = useRef(null);

    useEffect(()=>{
            getAllProducts();
    }, []);

    useEffect(()=>{
        mySingleProductRef.current = new Modal(singleProductRef.current,{backdrop:false});
    },[]);

    useEffect(()=>{
        if(!loading){
            document.body.style.overflow = 'auto' ;
        }
    },[loading]);

    async function getAllProducts(page=1, category='住宿'){
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/products?page=${page}`);
            console.log('getAllProducts',res);
            setPages(res.data?.pagination);
            setProducts(res.data?.products);
        } catch (error) {
            console.log('getAllProducts error',error);
            alert(`取得所有產品錯誤:${error.response.data.message}`)
        }finally{
            setLoading(false);
        }
    };

    async function addToCart(id,qty){
        setLoading(true);
        try {
            let data ={
                    "product_id" : id,
                    "qty": qty
                };
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {data});
            console.log('addToCart',res);
        } catch (error) {
            console.log('addToCart error' , error);
            alert(`加入購物車失敗:${error.response.data.message}`);
        }finally{
            closeMySingleProductModal();
            setLoading(false);    
        }
    };

    function showMySingleProductModal(id){
        setAddedProduct({
            product_id:id,
            qty:1
        });
        mySingleProductRef.current.show();
    };

    async function closeMySingleProductModal(){
            setAddedProduct({qty:1});
        mySingleProductRef.current.hide();
    }

    return(
        <>
        {
            loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
        }
        <div>
            <table className='table' >
                <thead>
                    <tr>
                        <th>圖片</th>
                        <th>商品名稱</th>
                        <th>價格</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        return(
                            <tr key={item.id}>
                            <td style={{ width: '200px' }}>
                              <div >
                                  <Link to={`./${item.id}`}>
                                  <img src={item.imageUrl} alt={item.title} style={{ height: '100px', backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                                  </Link>
                              </div>
                            </td>
                            <td>
                            <div className="h5">{item.title}</div>
                            </td>
                            <td>
                              <div className="h5">{item.price}</div>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-outline-secondary" 
                                onClick={()=>{setTempProduct(item); showMySingleProductModal(item.id);}}
                                >
                                  <i className="fas fa-spinner fa-pulse"></i>
                                  查看更多
                                </button>
                                <button type="button" className="btn btn-outline-danger"   disabled={loading}
                                onClick={()=> addToCart(item.id,1)}>
                                  <i className="fas fa-spinner fa-pulse"></i>
                                  加到購物車
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
            <PaginationComponent pages={pages} getAllProducts={getAllProducts} />
            </div>
         </div> 
         
         {/* {single product modal} */}
         <ShowProductDetailModalComponent
                 singleProductRef={singleProductRef}
                 tempProduct={tempProduct}
                 closeMySingleProductModal={closeMySingleProductModal}
                 setAddedProduct={setAddedProduct}
                 addToCart={addToCart}
                 loading={loading}
                 addedProduct={addedProduct}
                 />
        <Outlet></Outlet>
    </>
    )
};

export default ProductsListView;