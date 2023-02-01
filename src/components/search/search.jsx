import React, { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons"

const SearchHoliday = (props) =>{
    return(
        <div className="search">
            <input type="text" id="searchText" placeholder="Ingresa el texto para buscar tu feriado" onChange = {(e) => props.search(e.target.value) }/>
            <label htmlFor="searchText" className="me-2"><Search /></label>
        </div>
    );

}

export default SearchHoliday;