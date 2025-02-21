function PaginationComponent({pages, getAllProducts}){
      //pagination
      function handlePagination(e,page){
        e.preventDefault();
        console.log('handlePagination trigged', page)
        getAllProducts(page);
    }
    return(
        <nav>
        <ul className="pagination">
          <li className="page-item"><a className={`page-link ${!pages.has_pre && 'disabled'}`}
          href="#" onClick={(e)=>{ handlePagination(e, pages.current_page-1)}}>
            Previous</a></li>
          {
            //卡斯柏上課教的方法
            [...Array(pages.total_pages).keys()].map((item)=>{
              return(
                <li className="page-item" key={item+1}><a className={`page-link ${pages.current_page == item+1 && 'active'}`} 
                onClick={(e)=>{handlePagination(e, item+1)}}
                 href="#">{item+1}</a></li>
              )
            })
          }
          <li className="page-item"><a className={`page-link ${!pages.has_next && 'disabled'}`}
          href="#" onClick={(e)=>{handlePagination(e, pages.current_page+1)}}
          >Next</a></li>
        </ul>
      </nav>
    )
};

export default PaginationComponent;