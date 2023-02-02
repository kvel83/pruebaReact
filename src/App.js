import React, {useState} from 'react';

import MyApi from './components/myApi/myapi';
import SearchHoliday from './components/search/search';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className='container d-flex flex-column'>
      <div className='Header'>
        <h1 className='text-center mt-2 text-bg-light p-3 rounded-pill'>Listado de Feriados en Chile - Año 2023</h1>
      </div>
      <SearchHoliday search = {setSearchText}/>
      <MyApi searchText = {searchText}/>
    </div>
  );
}

export default App;
