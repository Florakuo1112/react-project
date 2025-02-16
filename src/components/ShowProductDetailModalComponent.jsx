function ShowProductDetailModalComponent(
    {
        singleProductRef,
        tempProduct,
        closeMySingleProductModal,
        setAddedProduct,
        addToCart,
        loading,
        addedProduct
    }
){
    return(
        <div className="modal" tabIndex="-1" ref={singleProductRef}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">產品名稱:{tempProduct.title}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={()=>closeMySingleProductModal()}></button>
            </div>
            <div className="modal-body">
                <img src={tempProduct.imageUrl} alt={tempProduct.title} style={{ height: '300px', backgroundSize: 'cover', backgroundPosition: 'center' }} className="my-3"/>
                <p>類型：{tempProduct.category}</p>
                <p>內容：{tempProduct.content}</p>
                <p>說明：{tempProduct.description}</p>
                <p>售格：{tempProduct.price}</p>
                <form className='d-flex align-items-center'>
                    <input type='number' value={addedProduct.qty} id="qty" className="form-control w-50" min="1" 
                    disabled={loading} 
                    onChange={(e)=>{setAddedProduct({product_id:tempProduct.id, qty:Number(e.target.value)})}}
                    />
                    <label htmlFor="qty" className='text-center'>{`${tempProduct.unit}`}</label>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-warning" 
                disabled={loading} onClick={()=>{addToCart(addedProduct.product_id, addedProduct.qty)}}>加入購物車</button>
            </div>
            </div>
        </div>
        </div>
    )
};

export default ShowProductDetailModalComponent;