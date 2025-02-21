import { useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Toast } from 'bootstrap';
import {removeMessage} from '../slice/adminProductStatusMessageSlice'

function AdminProductStatusMessageToastComponent(){
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.adminProductStatus.messages);
    const toastRefs = useRef({});
    // {
    //     12345:toastDom
    // }
    let currentToast;
    useEffect(()=>{
        messages.forEach((message) => {
            const toastElement = toastRefs.current[message.id];
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
                    ref={(el) => toastRefs.current[item.id] = el} >
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