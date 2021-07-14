import React from 'react'

type Props = {
    current?: number,
    pages:number,
    onPageChange: (e: React.MouseEvent<HTMLElement>) => void
}


const Pagination = ({current=1,pages,onPageChange}:Props):React.ReactElement=>{

    const pageCount = []
    if (pages >10 && current >= 10) {
        pageCount.push(1)

        //IF IS THE LAST ITEM
        if (current == pages) {
            for (let i = current-10; i <= current; i++) {
                pageCount.push(i)
            }
        }else {
            if(current+10 == pages){
                for (let i = current-10; i <= pages-10; i++) {
                    pageCount.push(i)
                }
            }else{
                for (let i = current-10; i <= current+1; i++) {
                    pageCount.push(i)
                }
                pageCount.push(500)
            }
        }
        
    }else{
        if (pages>=10) {
            for (let i = 1; i <= 10; i++) {
                pageCount.push(i)
            }
            pageCount.push(pages)
        }else{
            for (let i = 1; i <= pages; i++) {
                pageCount.push(i)
            }
        }
    }
    const isActive = (i:number)=>{
        return `page-item pointer ${current==i? 'active' :''}`
    }
    const canGoBack = ()=>{
        return `page-item ${current==1? 'disabled' :'pointer'}`
    }
    const canGoForward = ()=>{
        return `page-item ${current==pages? 'disabled' :'pointer'}`
    }
    return (
        <nav aria-label="...">
            <ul className="pagination justify-content-center flex-wrap">
                <li className={canGoBack()} >
                    <a className="page-link" onClick={onPageChange} id={`${current-1}`}>Previous</a>
                </li>
                {
                    pageCount.map(e=>(
                        <li key={e}  className={isActive(e)} onClick={onPageChange}>
                            <a id={e} className="page-link" >{e}</a>
                        </li>
                    ))
                }
                <li className={canGoForward()} >
                    <a className="page-link" onClick={onPageChange} id={`${current+1}`}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination