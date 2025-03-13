import axios from 'axios';
import { useState,useRef ,useEffect } from 'react';
import { Modal } from 'bootstrap';
import PaginationComponent from '../../components/PaginationComponent';
import LoadingComponent from '../../components/LoadingComponent';
import ShowProductDetailModalComponent from '../../components/ShowProductDetailModalComponent';
import { Outlet, Link} from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { pushMessage } from '../../slice/cartStatusSlice';
import { fetchCartItems } from '../../slice/cartStatusSlice';


// API_PATH
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsListView(){
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState({});
    const [tempProduct, setTempProduct] = useState({})
    const [addedProduct, setAddedProduct] = useState({qty:1});
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');

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
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/products?page=${page}&category=${category}`);
            console.log('getAllProducts',res);
            setPages(res.data?.pagination);
            setProducts(res.data?.products);
            setCategory(category)
        } catch (error) {
            console.log('getAllProducts error',error);
            alert(`取得所有產品錯誤:${error.response.data.message}`)
        }finally{
            dispatch(fetchCartItems());
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
            const text = `${res.data?.data?.product?.category}:
            ${res.data?.data?.product?.title}${res.data?.message}`;
            const success = res.data?.success;
            dispatch(pushMessage({text,success}))
        } catch (error) {
            console.log('addToCart error' , error);
            const text = `加入購物車失敗:${error.response?.data?.message}`;
            const success = false;
            dispatch(pushMessage({text,success}))
        }finally{
            dispatch(fetchCartItems());
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
    };

    useSelector((state) => {console.log(state.adminProductStatus)});
    const dispatch = useDispatch();

    return(
        <>
        {
            loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
        }
        <div className='container'>
            <div className='d-flex align-items-center py-3'>
                <h2 className='playwrite-it-moderna me-1'>Caliwoof Pet Hotel</h2><h5>家裏窩寵物旅館訂單系統</h5>
            </div>
            <ul className='d-flex p-0 '>
            <li ><button className={`border-0 rounded-3 p-2 me-2 ${category=='住宿'&& 'bg-primary'}`} onClick={()=>getAllProducts(1,'住宿')} >貓狗住宿</button></li>
            <li ><button className={`border-0 rounded-3 p-2 me-2 ${category=='安親'&& 'bg-primary'}`}  onClick={()=>getAllProducts(1,'安親')}>狗狗安親</button></li>
            <li ><button className={`border-0 rounded-3 p-2 me-2 ${category=='額外服務'&& 'bg-primary'}`}  onClick={()=>getAllProducts(1,'額外服務')}>額外服務</button></li>
            </ul>
            {<div className="row d-flex justify-content-between pb-4">
                
                    {
                        products.map((item) => {
                            return(<>
                            <div className="col-12 col-md-4" key={item.id}>
                            <div className="card bg-transparent border-0 pt-5"  style={{height:400}}>
                                <Link to={{pathname:item.id}} style={{height:'60%',maxWidth:'80%'}}>
                                    <img src={item.imageUrl} className="card-img-top" alt="..." 
                                style={{height:'100%',maxWidth:'100%', objectFit:'contain'}}/>
                                </Link>
                                <div className="card-body d-flex justify-content-between">
                                    <p className="card-title fs-5">{item.title}</p>
                                    <p className="card-text fs-5">${item.price} / {item.unit}</p>
                                </div>
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
                            </div>
                            </div>
                            </>)
                        })
                    }

                
            </div>}

            <div className="d-flex justify-content-center">
                {pages.total_pages >1 &&
            <PaginationComponent pages={pages} getAllProducts={getAllProducts} category={category} />
                }
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