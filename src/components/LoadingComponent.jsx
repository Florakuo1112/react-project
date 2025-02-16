import ReactLoading from 'react-loading';


function LoadingComponent({type, color}){
    document.body.style.overflow = 'hidden' ;
    return(
        <div
        style={{
            position:'fixed',
            top:0,
            right:0,
            bottom:0,
            left:0,
            backgroundColor:'rgba(255,255,255,0.5)',
            display:"flex",
            justifyContent:'center',
            alignItems: 'center',
            zIndex:1000,
            backdropFilter:'blur(1px)'
        }}
        >
            <ReactLoading type={type} color={color} height={50} 
        />
        </div>

    )
}
 
export default LoadingComponent;