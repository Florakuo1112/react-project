import { useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Toast } from 'bootstrap';
import {removeMessage} from '../slice/adminProductStatusMessageSlice'

function AdminProductStatusMessageToastComponent(){
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.adminProductStatus.messages);
    const toastRefs = useRef({});
    //1.先建立useRef做dom使用（裡面是物件，物件內會包{id:真正的dom}）
    //2.toastRefs用ref去對應要抓取的dom,但是messages是以陣列map return出來，會產生很多個
    //toast,所以是以以下方法把多個dom存在toastRefs中
    // {
    //     id1:toastDom,id2:toastDom,
    // }
    let currentToast;
    useEffect(()=>{
        messages.forEach((message) => {
            const toastElement = toastRefs.current[message.id];//用foreach取出所有的toastDom
            console.log(toastElement);
            if(toastElement){
                currentToast = Toast.getOrCreateInstance(toastElement);
                currentToast.show();
                 setTimeout(()=>{
                    dispatch(removeMessage(message.id))
                },2000);
            };
        });
    },[messages]);

    //function
    function handleDismiss(messageId){
        dispatch(removeMessage(messageId));
    }

    return(
        <>
        <div className="position-fixed" 
        style={{top:10,right:10,zIndex:1001}}>
            {messages.map((item) => {
                return(
                    <div className="toast" role="alert" key={item.id}
                    ref={(dom) => toastRefs.current[item.id] = DOMQuad} >
                        <div className={`toast-header text-light 
                        ${item.success? 'bg-success' : 'bg-danger'}`}>
                            <strong className="me-auto">
                            {item.success? '成功' : '失敗'}
                            </strong>
                            <button type="button" className="btn-close" 
                            onClick={()=>handleDismiss(item.id)}></button>
                        </div>
                        <div className="toast-body">
                            {item.text}
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
};

export default  AdminProductStatusMessageToastComponent;