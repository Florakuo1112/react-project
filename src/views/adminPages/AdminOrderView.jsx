import { useState,useEffect } from 'react'
import axios  from 'axios';

import LoadingComponent from '../../components/LoadingComponent';

// API_PATH
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminOrderView(){
    const [loading, setLoading] = useState(false);
    const [searchTel, setSearchTel] = useState('0987654321');
    const [orders, setOrders] = useState({});
    const [resultUnpaidOrder, setResultUnpaidOrder] = useState([]);
    const [resultPaidOrder, setResultPaidOrder] = useState([]);
    const [showUnpaidPrder, setshowUnpaidPrder] = useState(true);

    useEffect(() => {
        fetchOrders();

    },[]);

    async function fetchOrders(){
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`);
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    };

    function findResultOrder(telNum){
        setLoading(true);
        const unpaidRes = orders.filter((item) => item.user.tel == telNum && !item.is_paid);
        const paidRes = orders.filter((item) => item.user.tel == telNum && item.is_paid);
        setResultUnpaidOrder(unpaidRes);
        setResultPaidOrder(paidRes);
        setLoading(false);
    };

    function transferDate(timeStamp){
        const time = timeStamp*1000;
        const date = new Date(time);
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate() + 1;
        return `${yyyy}/${mm}/${dd}`
    };

    async function deleteOrder(id){
        setLoading(true);
        try {
            const res = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/order/${id}`);
        } catch (error) {
            console.log(error)
        }finally{
            fetchOrders();
            findResultOrder(searchTel)
            setLoading(false);
        }
    };

    async function confirmOrder(item, id){
        setLoading(true);
        const newValue = {...item};
        newValue.is_paid = true;
        newValue.paid_at = Math.floor(Date.now() / 1000);
        try {
            const res = await axios.put(`${API_BASE}/api/${API_PATH}/admin/order/${id}`, {data:newValue});
        } catch (error) {
            console.log(error)
        }finally{
            fetchOrders();
            findResultOrder(searchTel)
            setLoading(false);
        }
    };

    return(<>
    {
        loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
    }
    <div >
    <h4>訂單管理</h4>
     <div className="row">
         <div className="col-4">
            <h5>快速查詢</h5>
            <div className="mb-3">
            <label htmlFor="telInput" className="form-label">請輸入電話號碼</label>
            <input type="tel" className="form-control" id="telInput" onChange={(e)=>{setSearchTel(e.target.value)}} value={searchTel}/>
            <button type="button" className="btn btn-outline-secondary w-100 mt-3" onClick={(e)=>{findResultOrder(searchTel)}}>查詢</button>
            </div>
         </div>
         <div className="col-8">
            <h5>查詢結果</h5>
            <a href='#' className="text-secondary me-3" onClick={(e)=>{e.preventDefault();setshowUnpaidPrder(true)}}>{resultUnpaidOrder.length}筆未付款</a>
            <a href='#'  className="text-secondary" onClick={(e)=>{e.preventDefault(); setshowUnpaidPrder(false)}}>{resultPaidOrder.length}筆已完成</a> 
            {showUnpaidPrder ? (resultUnpaidOrder.map((item)=>{return(<>
                <div className="card mb-2">
                    <div className="card-body d-flex">
                        <div className='w-50'>
                        毛孩家長:{item.user.name} <br/>
                        毛孩:{item.user.petName} <br/>
                        建立日期:{transferDate(item.create_at)}<br/>      
                        訂單編號:{item.id}
                        </div>
                        <div className='w-50'>
                        訂單明細:<br/>
                        {Object.values(item.products).map((item,index) => {
                            return(<>
                            {index+1}:{item.product.title}{item.product.category}:{item.product.price} x {item.qty} = {item.total}<br/> 
                            </>)
                        })}
                        訂單總額:{item.total}元<br/> 
                        留言板:{item.message}
                        <div className='mt-3'>
                            <a href="#" class="btn btn-outline-danger " onClick={(e)=>{e.preventDefault(); deleteOrder(item.id)}}>刪除訂單</a>
                            <a href="#" class="btn btn-outline-secondary ms-2" onClick={(e)=>{e.preventDefault();confirmOrder(item, item.id)}}>確認付款</a>
                        </div>
                        </div>
                    </div>

                </div>
            </>)})):(
                resultPaidOrder.map((item)=>{return(<>
                <div className="card mb-2">
                    <div className="card-body d-flex">
                        <div className='w-50'>
                        毛孩家長:{item.user.name} <br/>
                        毛孩:{item.user.petName} <br/>
                        建立日期:{transferDate(item.create_at)}<br/>
                        完成日期:{transferDate(item.paid_at)}<br/>        
                        訂單編號:{item.id}
                        </div>
                        <div className='w-50'>
                        訂單明細:<br/>
                        {Object.values(item.products).map((item,index) => {
                            return(<>
                            {index+1}:{item.product.title}{item.product.category}:{item.product.price} x {item.qty} = {item.total}<br/> 
                            </>)
                        })}
                        訂單總額:{item.total}元 <br/>
                        留言板:{item.message}
                        </div>
                    </div>

                </div>
            </>)})
            )
            }

        </div>
     </div>
    </div>

    </>)
};

export default AdminOrderView;