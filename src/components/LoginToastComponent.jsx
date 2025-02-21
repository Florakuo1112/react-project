function LoginToastComponent({loginToastRef,loginStatus, closeLoginToast}){
    return(
        <>
        <div className="toast position-fixed" role="alert"  ref={loginToastRef}
        style={{top:10,right:10,zIndex:1001}}
        >
            <div className={`toast-header ${loginStatus == true ? 'bg-success': 'bg-danger'} text-light`}>
                <strong className="me-auto">{loginStatus ? '成功' : '尚未登入'}</strong>
                <button type="button" className="btn-close" onClick={()=>closeLoginToast()}></button>
            </div>
            <div className="toast-body">
                {loginStatus ? '已登入後台' : '請先登入'}
            </div>
        </div>
        </>
    )
};

export default LoginToastComponent;