import React from 'react'

export default function Pagination({ totalPok, pokPerPage, paginate, ixCurrent }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPok / pokPerPage); i++) {
        pageNumbers.push(i)

    }

    return (
        <div className='pagContent'>
            <ul className='paginations'>
                <li className='page-item'>
                    <a className='page-link' style={ixCurrent - 1 < 1 ? { pointerEvents: "none", background: "#eee" } : null} 
                    onClick={() => paginate(ixCurrent - 1)} href='#!'>
                        Prev
                    </a>
                </li>
                {pageNumbers.map(num => (
                    <li className='page-item' key={num} >
                        <a className={num === ixCurrent ? 'page-link act' : 'page-link'} onClick={() => paginate(num)} href='#!'>
                            {num}
                        </a>
                    </li>
                ))}
                <li className='page-item'>
                    <a className='page-link' style={ixCurrent + 1 > pageNumbers.length ? { pointerEvents: "none", background: "#eee" } 
                    : null} onClick={() => paginate(ixCurrent + 1)} href='#!'>
                        Next
                    </a>
                </li>
            </ul>
        </div>
    )
}
