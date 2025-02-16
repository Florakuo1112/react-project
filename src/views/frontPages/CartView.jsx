import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router'
import LoadingComponent from '../../components/LoadingComponent';

// 請自行替換 API_PATHconst 
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const InputComponent = ({id,errors,title,placeholder, validateRule,register, type}) => {
    return(
        <div className="mb-3">
        <label htmlFor={id} className="form-label">{title}</label>
        <input type={type} className={`form-control  ${errors[id] && 'is-invalid'}`} id={id} placeholder={placeholder}
                {...register(id,validateRule)}
        />
        {errors[id] && <div  className="invalid-feedback"> {errors[id]?.message} </div> }
        </div>
    )
};

const TextAreaComponent = ({id, title,register}) => {
    return(
        <div className="mb-3">
        <label htmlFor={id}>{title}</label>
        <textarea className="form-control" id={id} style={{height: '100px'}}
        {...register(id)} />
        </div>
    )
};

const formDefaultValues = {
    email:'',
    tel:'',
    name:'',
    address:'',
    message:''
};

function CartView(){
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartInfo, setCartInfo] = useState({});

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    }= useForm(
        {
        mode: 'onChange',
        defaultValues:formDefaultValues
    });
    const onSubmit = (data)=>{
        console.log(data);
        submitOrder(data);
        reset(formDefaultValues);
        navigate('/');

    };

    console.log('err',errors)
    //react-hook-form 流程 
    //1.import useForm 2.在useForm取出register,handleSubmit 
    //3.寫onSubmit(data) 4.綁定input{...register('')} 與設定驗證 5.用form onSubmit={handleSubmit(onSubmit)} 確認是否有取正確
    //6.在useForm取出formState:{errors}

    const navigate = useNavigate();

    useEffect(()=>{
        getCartItems();
}, []);


async function getCartItems(){
    setLoading(true);
    try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        console.log('getCartItems', res);
        setCartItems(res.data.data.carts);
        setCartInfo(res.data.data);
    } catch (error) {
        console.log('getCartItems error', error);
        alert(`取得購物車列表錯誤:${error.response.data.message}`);
    }finally{
        setLoading(false);
    }     
};

async function deleteCarts(){
    setLoading(true);
    try {
        const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
        console.log('deleteCarts',res);
        console.log('deleteCarts await finish');       
    } catch (error) {
        console.log(' deleteCarts error', error);
        alert(`刪除購物車失敗:${error.response.data.message}`);
    }finally{
        await getCartItems();
        setLoading(false);
    }
};

async function deleteSingleCartItem(id){
    setLoading(true);
    try {
        const res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
        console.log('deleteSingleCartItem',res);      
    } catch (error) {
        console.log(' deleteSingleCartItem error', error);
        alert(`刪除產品失敗':${error.response.data.message}`);
    }finally{
        await getCartItems();
        setLoading(false);
    };
};

async function reviseCartItemQty(id, qty){
    setLoading(true);
    try {
        const data = {
            "product_id" : id,
            "qty" : qty
        };
        const res = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`,{data});
        console.log('reviseCartItemQty',res);           
    } catch (error) {
        console.log('reviseCartItemQty error', error);
        alert(`更改產品數量失敗':${error.response.data.message}`)        
    }finally{
        await getCartItems();
        setLoading(false);
    }
};

async function submitOrder(userInfo){
    setLoading(true);
    const data = {
        user:{
            name: userInfo.name,
            email : userInfo.email,
            tel : userInfo.tel,
            address : userInfo.address
        },
        message: userInfo.message
    }
    try {
        const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`,{data});
        console.log(res.data.message);
        alert(res.data.message);
        console.log('submitOrder await finish')               
    } catch (error) {
        console.log('submitOrder error', error.response.data);
        alert(`失敗:${error.response.data.message}`);          
    }finally{
        await getCartItems();
        setLoading(false);
    }        
}

    return(
        <>
        {
            loading &&<LoadingComponent type={'spin'} color={"#FF8C00"}/>
        }
        <div className="text-end">
            <button className="btn btn-outline-danger" type="button" onClick={()=>deleteCarts()}>清空購物車</button>
        </div>
        <div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th>單價</th>
                <th>單位</th>
                <th style={{ width: '150px' }}>數量</th>
              </tr>
            </thead>
            <tbody>
              {/* Cart rows here */}
              {
                  cartItems.map((item)=>{
                      return(
                          <tr key={item.id}>
                              <th><button type="button" className="btn btn-outline-secondary" 
                              onClick={()=>{deleteSingleCartItem(item.id)}}>Ｘ</button></th>
                              <th>{item.product.title}</th>
                              <th>{item.product.price}</th>
                              <th>{item.product.unit}</th>
                              <th>
                                  <input type='number' value={item.qty}  className="form-control w-50" min="1"  disabled={loading} onChange={(e)=>{reviseCartItemQty(item.id, Number(e.target.value))}}/>
                              </th>
                         </tr>
                      )
                  })
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">總計</td>
                <td className="text-end">{cartInfo.total}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end text-success">折扣價</td>
                <td className="text-end text-success">{cartInfo.final_total}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* {表單} */}
        <div className="my-5 row justify-content-center">
            <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <InputComponent id={"email"} errors={errors} title={"Email"} placeholder={"請輸入Email"}  register={register} 
            type={"email"}
            validateRule={{
                required:"必填",
                pattern:{
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "請輸入有效的 Email 格式",
                }
            }}
            />
            <InputComponent id={"name"} errors={errors} title={"收件者姓名"} placeholder={"請輸入姓名"}  register={register} type={'text'}  validateRule={{required:"必填"}}/>
            <InputComponent id={"tel"} errors={errors} title={"收件者電話"} placeholder={"請輸入電話"}  register={register} type={'tel'}
            validateRule={{
                required:"必填", 
                minLength:{
                value:8, 
                message:"電話需超過 8 碼"
                }
            }}
            />
            <InputComponent id={"address"} errors={errors} title={"收件者地址"} placeholder={"請輸入地址"}  register={register} type={'text'} validateRule={{required:"必填"}}/>
            <TextAreaComponent id={"message"} title={"留言"} register={register}/>
            <button className='btn btn-outline-primary' disabled={loading}>submit</button>
            </form>
        </div>
        </>
    )
};

export default CartView;