import React from "react";

import "./search.css"

const SearchHoliday = (props) =>{
    return(
        <div className="search d-flex flex-column justify-content-start p-3 text-bg-light">
            <label htmlFor="searchText" className="me-2">Puedes buscar el feriado que desees por nombre, fecha, si es irrenunciable o tipo:</label>
            <input type="text" className = "rounded-pill border border-1 mt-1" id="searchText" onChange = {(e) => props.search(e.target.value) }/>
        </div>
    );

}

export default SearchHoliday;