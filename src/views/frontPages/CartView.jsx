import axios from 'axios';
import "flatpickr/dist/flatpickr.min.css"; // Flatpickr 樣式
import Flatpickr from "react-flatpickr";

import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {useNavigate} from 'react-router'

import { useDispatch } from 'react-redux';
import { pushMessage } from '../../slice/cartStatusSlice';

import LoadingComponent from '../../components/LoadingComponent';

import { fetchCartItems } from '../../slice/cartStatusSlice';

// API_PATH
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

const DatePickerComponent = ({ id, title, control, text, errors, validateRule}) => {
    return (
      <div className="mb-3">
        <label htmlFor={id}>{title}</label>
        <Controller
          name={id}
          control={control}
          rules={validateRule}
          render={({ field }) => (
            <Flatpickr className={`form-control  ${errors[id] && 'is-invalid'}`} id={id} {...field} placeholder={text}
            options={{
                dateFormat: "Y-m-d",
              }}/>
          )}></Controller>
          {errors[id] && <div className="invalid-feedback">{errors[id].message}</div> }
      </div>
    );
  };

const DateRangePickerComponent = ({ id, title, control, text,errors, validateRule }) => {
return (
    <div className="mb-3">
    <label htmlFor={id}>{title}</label>
    <Controller
        name={id}
        control={control}
        rules={validateRule}
        render={({ field }) => (
        <Flatpickr className={`form-control  ${errors[id] && 'is-invalid'}`} id={id} {...field} placeholder={text}
        options={{
            mode:"multiple",
            dateFormat: "Y-m-d",
            }}/>
            
        )}>
        </Controller>
        {errors[id] && <div className="invalid-feedback">{errors[id].message}</div> }
    </div>
);
};

const formDefaultValues = {
    email:'',
    tel:'',
    name:'',
    address:'',
    message:'',
    dateRange:''
};


function CartView(){
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartInfo, setCartInfo] = useState({});
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState:{errors},
        control
    }= useForm(
        {
        mode: 'onChange',
        defaultValues:formDefaultValues
    });
    const onSubmit = (data)=>{
        // let newCreateDate = [...data.createDate][0];
        // newCreateDate = `${newCreateDate.getFullYear()}-${(newCreateDate.getMonth()+1)}-${newCreateDate.getDate()}`;
        // data.createDate = newCreateDate;

        let newComingDate = [...data.comingDate].map((item) => {
            let month;
            let date;
            if(item.getMonth()+1< 10){
                month = `0${item.getMonth()+1}`
            }else{
                month =item.getMonth()+1
            };
            if(item.getDate()<10){
                date = `0${getDate()}`
            }else{
                date = item.getDate();
            };  
            return(`${item.getFullYear()}${month}${date}`)
        });
        data.comingDate = newComingDate;
        console.log(data);
        submitOrder(data);

    };

    console.log('err',errors)
    //react-hook-form 流程 
    //1.import useForm 2.在useForm取出register,handleSubmit 
    //3.寫onSubmit(data) 4.綁定input{...register('')} 與設定驗證 5.用form onSubmit={handleSubmit(onSubmit)} 確認是否有取正確
    //6.在useForm取出formState:{errors}

    useEffect(()=>{
        getCartItems();
    }, []);

    useEffect(()=>{
        if(!loading){
            document.body.style.overflow = 'auto' ;
        }
    },[loading]);

    const dispatch = useDispatch();

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
        dispatch(fetchCartItems());
        setLoading(false);
    }     
};

async function deleteCarts(){
    setLoading(true);
    try {
        const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
        console.log('deleteCarts',res);
        const text = `${res.data?.message}整個購物車`;
        const success = res.data?.success;
        dispatch(pushMessage({text, success}))           
    } catch (error) {
        console.log(' deleteCarts error', error);
        const text = `刪除購物車失敗:${error.response?.data.message}`;
        const success = false;
        dispatch(pushMessage({text,success}))   
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
        const text = `${res.data?.message}該品項`;
        const success = res.data?.success;
        dispatch(pushMessage({text, success}))          
    } catch (error) {
        console.log(' deleteSingleCartItem error', error);
        const text = error.response?.data.message;
        const success = false;
        dispatch(pushMessage({text,success}))     
    }finally{
        await getCartItems();
        setLoading(false);
    };
};

async function reviseCartItemQty(cartId, productId, qty){
    setLoading(true);
    try {
        const data = {
            "product_id" : productId,
            "qty" : qty
        };
        const res = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`,{data});
        console.log('reviseCartItemQty',res);
        const text = `${res.data?.message}數量為${res.data?.data?.qty}`;
        const success = res.data?.success;
        dispatch(pushMessage({text, success}))       
    } catch (error) {
        console.log('reviseCartItemQty error', error);
        const text = error.response?.data.message;
        const success = false;
        dispatch(pushMessage({text,success}))     
    }finally{
        await getCartItems();
        setLoading(false);
    }
};

async function submitOrder(userInfo){
    setLoading(true);
    const data = {
        user:{
            email : userInfo.email,
            name: userInfo.name,
            petName: userInfo.petName,
            tel : userInfo.tel,
            comingDate: userInfo.comingDate,
            address : userInfo.address,
        },
        message: userInfo.message
    }
    try {
        const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`,{data});
        console.log(res.data.message);
        alert(res.data?.message);
        console.log('submitOrder await finish')
        navigate('/')              
    } catch (error) {
        console.log('submitOrder error', error.response?.data);
        alert(`失敗:${error.response?.data.message}`);          
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
        <div className='container'>
            <div className='d-flex align-items-center py-3'>
                <h2 className='playwrite-it-moderna me-1'>Caliwoof Pet Hotel</h2><h5>家裏窩寵物旅館訂單系統</h5>
            </div>
            <div className="row justify-content-between">
                <div className='my-6 col-md-6'>
                    <table className="table align-middle ">
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
                                            <input type='number' value={item.qty}  className="form-control w-100" min="1"  disabled={loading} onChange={(e)=>{reviseCartItemQty(item.id,item.product_id, Number(e.target.value))}}/>
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
                    <div>
                            <div className="text-end">
                            <button className="btn btn-outline-secondary" type="button" disabled={cartItems.length == 0 || loading}
                            onClick={()=>deleteCarts()}>清空購物車</button>
                            </div>
                    </div>
                </div>

            

                {/* {表單} */}
                <div className="my-5 col-md-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                    <InputComponent id={"name"} errors={errors} title={"家長姓名"} placeholder={"請輸入姓名"}  register={register} type={'text'}  validateRule={{required:"必填"}}/>
                    <InputComponent id={"petName"} errors={errors} title={"毛孩名稱"} placeholder={"請輸入毛孩名稱"}  register={register} type={'text'}  validateRule={{required:"必填"}}/>
                    <InputComponent id={"tel"} errors={errors} title={"聯絡電話"} placeholder={"請輸入電話"}  register={register} type={'tel'}
                    validateRule={{
                        required:"必填", 
                        pattern:{
                            value: /^\d{8,}$/,
                        message:"電話需超過8碼數字"
                        }
                    }}
                    />
                    {/* <DatePickerComponent id={"createDate"} title={"訂單日期"} control={control} text="請輸入訂單日期" errors={errors} validateRule={{required:"必填"}}></DatePickerComponent> */}
                    <DateRangePickerComponent id={"comingDate"} title={"到店日期"} control={control} text="請輸入到店日期" errors={errors} validateRule={{required:"必填"}}></DateRangePickerComponent>
                    <InputComponent id={"address"} errors={errors} title={"接送地址(如需接送服務)"} placeholder={"請輸入接送地址"}  register={register} type={'text'} />
                    <TextAreaComponent id={"message"} title={"留言板"} register={register}/>
                    <button className='btn btn-outline-secondary w-100' disabled={cartItems.length == 0 || loading}>確認</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
};

export default CartView;