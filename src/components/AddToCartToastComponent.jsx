import { useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Toast } from 'bootstrap';
import {removeMessage} from '../slice/cartStatusSlice'

function AddToCartToastComponent(){
    const messages = useSelector((state) => state.cartStatus.messages);
    const dispatch = useDispatch();
    //ref
    const addToCartToastRef = useRef({});
    //1.先建立useRef做dom使用（裡面是物件，物件內會包{id:真正的dom}）
    //2.addToCartToastRef用ref去對應要抓取的dom,但是messages是以陣列map return出來，會產生很多個
    //toast,所以是以以下方法把多個dom存在addToCartToastRef中
    // {
    //     id1:toastDom,id2:toastDom,
    // }
    let currentToast;
    useEffect(() => {
        messages.forEach((message) => {
            const toastElement = addToCartToastRef.current[message.id];//用foreach取出所有的toastDom
            if(toastElement){
                currentToast = Toast.getOrCreateInstance(toastElement);
                currentToast.show();
                setTimeout(() => {
                    dispatch(removeMessage(message.id))
                },2000)
            }

        })
    },[messages])

    return(
        <>
        <div className=" position-fixed" 
        style={{top:10,right:10,zIndex:1001}}>
            {messages.map((item) => {
                return(<>
                        <div className="toast " role="alert" ket={item.id} 
                        ref={(dom)=> addToCartToastRef.current[item.id] = dom}  >
                            <div className="toast-body">
                                {item.text}
                            </div>
                        </div>

                        </>)
            })}
        </div>
        </>
    )
};

export default AddToCartToastComponent;