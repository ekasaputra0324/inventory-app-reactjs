import React, { Component } from 'react'

export default function pagination ({postsPerPage, totalPosts, paginate}) {

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }
    
    return (
      <div>
         <nav aria-label="Page navigation example mb-4">
                  <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                  {pageNumber.map(number => {
                      return(
                  <li key={number} class="page-item">
                    <a  onClick={() => paginate(number)} class="page-link"  href="#">{number}</a>
                  </li>
                  )
                  })}
                  <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
      </div>
    )
}
