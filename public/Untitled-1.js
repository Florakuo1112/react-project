[
    {
        path:'/',
        children:[
            {
                path:'about'
            }
        ]
    },
    {
        path:'/admin',
        children:[
            {
                path:'products'
            }
        ]
    },
    {
        path:'/login'
    }
]

// 測試所使用的 JSON.stringify 建議移除唷，也避免洩漏重要資料（例如：formData）
// 測試所使用的 console.log 建議移除唷，例如：login 函式的 console.log(res.data.message)
// 登入失敗時，也可透過 alert 來告知使用者
// 新增、編輯產品如果失敗時，也可以透過 alert 或 toast 來告知使用者，而 alert 的內容可回傳 response.data.message，讓使用者更了解目前狀況唷（像是什麼欄位沒填寫到）
// 原價 / 售價記得加上 min=0，可初步防止選擇到負數唷
// 圖片上傳的 input 欄位，會留有上一個圖片名稱，可以嘗試做清空唷
// 根據 API 文件，在新增 / 編輯產品時，is_enabled 的值要存成 0 或 1，0 代表未啟用，1 代表啟用
// 分頁 a 標籤 click 時需加上 prevent 阻止預設行為
// 多圖部分的新增按鈕，也可以考量加上判斷，當圖片已有第五筆時則將按鈕隱藏
// 有看到同學使用 isAuthRef 的 useRef 來做元件的顯示判斷，不過因為 useRef 的變更不會觸發元件的重新渲染，因此這個部分建議使用 useState 來做判斷哩
// 在 closeProductModal 函式中，有看到 document.querySelector 的操作，而在 React 的虛擬 DOM 機制中是比較不建議的。可以使用 React 狀態或 ref 來做處理唷