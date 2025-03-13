import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {useParams, useNavigate, Link} from "react-router";
import LoadingComponent from '../../components/LoadingComponent';
import { useDispatch } from "react-redux";
import { fetchCartItems} from "../../slice/cartStatusSlice";
import { pushMessage } from '../../slice/cartStatusSlice';
// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductView(){
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const [product, setProduct] = useState({});
    const [addedProduct, setAddedProduct] = useState({qty:1});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductInfo()
    },[])

    async function getProductInfo(){
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
            setProduct(res.data?.product);
        } catch (error) {
            console.log(error)
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
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cartt`, {data});
            const text = `${res.data?.data?.product?.category}:
            ${res.data?.data?.product?.title}${res.data?.message}`;
            const success = res.data?.success;
            dispatch (pushMessage({text,success}));
            console.log('addToCart',res);
        } catch (error) {
            console.log('addToCart error' , error);
            const text = `加入購物車失敗:${error.response?.data?.message}`;
            const success = false;
            dispatch(pushMessage({text,success}))
        }finally{
            dispatch (fetchCartItems());
            setLoading(false);    
        }
    };

    return(
        <>
        {
            loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
        }
        <div className="container">
            <div className='d-flex align-items-center py-3'>
                    <h2 className='playwrite-it-moderna me-1'>Caliwoof Pet Hotel</h2><h5>家裏窩寵物旅館訂單系統</h5>
            </div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to={{pathname:'/ProductList'}} className="breadcrumb-item active" aria-current="page" style={{textDecoration: 'none'}}>訂單系統</ Link>
                    <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                </ol>
            </nav>
      
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="card bg-transparent border-0" >
                    <img src={product.imageUrl} className="card-img-top w-50" alt="..." />
                    <div className="card-body">
                        <p>類型：{product.category}</p>
                        <p>內容：{product.content}</p>
                        <p>說明：{product.description}</p>
                        <p>售格：{product.price}</p>
                        <form className='d-flex align-items-center'>
                            <input type='number' value={addedProduct.qty} id="qty" className="form-control w-50" min="1" 
                            disabled={loading} 
                            onChange={(e)=>{setAddedProduct({product_id:product.id, qty:Number(e.target.value)})}}/>
                            <label htmlFor="qty" className='text-center'>{`${product.unit}`}</label>
                        </form>
                        <button type="button" className="btn btn-secondary mt-3 w-50" disabled={loading} 
                        onClick={()=>{addToCart(product.id, addedProduct.qty)}}>
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>

</>
    );
};

export default ProductView;