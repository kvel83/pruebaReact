import React, {useState} from 'react';

import MyApi from './components/myApi/myapi';
import SearchHoliday from './components/search/search';

import './App.css';

function App() {
  // Estado para guardar el texto de búsqueda
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      {/* //componente que realiza las búsquedas, le pasamos por parametros al componente Search el metodo que setea el estado que guarda el texto de busqueda */}
      <SearchHoliday search = {setSearchText}/>
      {console.log(searchText)}
      {/* //componente que realiza la conexion a la API y renderiza la información traída , le pasamos por parametro el estado que guarda el texto de busqueda asi puede renderizar de forma automatica los que cumplen con ese parametro o, en caso de que este vacia renderiza todos los datos*/}
      <MyApi searchText = {searchText}/>
    </div>
  );
}

export default App;
