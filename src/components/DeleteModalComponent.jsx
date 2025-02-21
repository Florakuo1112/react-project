function DeleteModalComponent({delProductModalRef, closeDeletProductModal, tempProduct, deleteProduct}){
    return(
        <div className="modal" tabIndex="-1" ref={delProductModalRef} style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex:999 }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">刪除產品</h5>
        <button type="button" className="btn-close" 
        onClick={()=>closeDeletProductModal()}></button>
      </div>
      <div className="modal-body">
        <p>請確認是否要刪除:{tempProduct.title}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>closeDeletProductModal()}>取消</button>
        <button type="button" className="btn btn-danger" onClick={()=>deleteProduct(tempProduct.id)}>確認刪除</button>
      </div>
    </div>
  </div>
</div>
    )
};

export default DeleteModalComponent;