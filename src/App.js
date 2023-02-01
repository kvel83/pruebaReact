import React, {useState} from 'react';

import MyApi from './components/myApi/myapi';
import SearchHoliday from './components/search/search';

import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      {/* //componente que realiza las búsquedas */}
      <SearchHoliday search = {setSearchText}/>
      {console.log(searchText)}
      {/* //componente que realiza la conexion a la API y renderiza la información traída */}
      <MyApi searchText = {searchText}/>
    </div>
  );
}

export default App;
