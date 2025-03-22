function PaginationComponent({pages, getAllProducts, category}){
      //pagination
      function handlePagination(e,page, category){
        e.preventDefault();
        console.log('handlePagination trigged', page)
        getAllProducts(page,category);
    }
    return(
        <nav>
        <ul className="pagination">
          <li className="page-item"><a className={`text-secondary bg-transparent page-link ${!pages.has_pre && 'disabled'}`}
          href="#" onClick={(e)=>{ handlePagination(e, pages.current_page-1, category)}}>
            Previous</a></li>
          {
            [...Array(pages.total_pages).keys()].map((item)=>{
              return(
                <li className="page-item" key={item+1}><a className={`text-secondary page-link ${pages.current_page == item+1 && 'active'}`} 
                onClick={(e)=>{handlePagination(e, item+1, category)}}
                 href="#">{item+1}</a></li>
              )
            })
          }
          <li className="page-item"><a className={`text-secondary  bg-transparent page-link ${!pages.has_next && 'disabled'} `}
          href="#" onClick={(e)=>{handlePagination(e, pages.current_page+1, category)}}
          >Next</a></li>
        </ul>
      </nav>
    )
};

export default PaginationComponent;