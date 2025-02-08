function PaginationComponent({pageRef, handlePagination}){
    return(
        <nav>
        <ul className="pagination">
          <li className="page-item"><a className={`page-link ${!pageRef.current.has_pre && 'disabled'}`}
          href="#" onClick={()=>{handlePagination(pageRef.current.current_page-1)}}>
            Previous</a></li>
          {
            //卡斯柏上課教的方法
            [...Array(pageRef.current.total_pages).keys()].map((item)=>{
              return(
                <li className="page-item" key={item+1}><a className={`page-link ${pageRef.current.current_page == item+1 && 'active'}`} 
                onClick={()=>{handlePagination(item+1)}}
                 href="#">{item+1}</a></li>
              )
            })
          }
          <li className="page-item"><a className={`page-link ${!pageRef.current.has_next && 'disabled'}`}
          href="#" onClick={()=>{handlePagination(pageRef.current.current_page+1)}}
          >Next</a></li>
        </ul>
      </nav>
    )
};

export default PaginationComponent;