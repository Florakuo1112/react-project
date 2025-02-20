import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {useParams, useNavigate} from "react-router";
import LoadingComponent from '../../components/LoadingComponent';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductView(){
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({});
    const [addedProduct, setAddedProduct] = useState({qty:1});
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getProductInfo();
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
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {data});
            console.log('addToCart',res);
        } catch (error) {
            console.log('addToCart error' , error);
            alert(`加入購物車失敗:${error.response.data.message}`);
        }finally{
            setLoading(false);    
        }
    };

    return(
        <>
        {
            loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
        }
        <h2>產品詳細頁</h2>
        <div className="row justify-content-center">
            <div className="col-8 ">
                <div className="card" >
                    <img src={product.imageUrl} className="card-img-top" alt="..." />
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
                        <button type="button" className="btn btn-warning" disabled={loading} 
                        onClick={()=>{addToCart(product.id, addedProduct.qty); navigate('/productlist')}}>
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>

</>
    );
};

export default ProductView;