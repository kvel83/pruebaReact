import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";

const MyApi = (props) => {
    //estado que contiene mi data
    const [dataApi, setDataApi] = useState([]);
    //estado que contiene el ultimo ordenamiento si es ascendente o descendente
    const [sort, setSort] = useState('asc');

    //Método que ordena la columna de la tabla
    const handleSort = (column) => {
        if (sort === 'asc'){
            //creo variable donde guardare mis datos ordenados, ya sea asc o des, ocupo el metodo sort que pertenece a los arreglos para el ordenamiento
            const sortedObject = [...dataApi].sort((a,b) => {
                //con estos if veo cual va primero cual despues, si es -1 el a va primero, si es 1 el a va despues, si retorna 0 es pq son iguales
                if (a[column] < b[column]) return -1;
                if (a[column] > b[column]) return 1;
                return 0;
            });
            //seteo mi data con los datos ordenados
            setDataApi(sortedObject);
            //cambio el ordenamiento para la proxima vez
            setSort('des');
        };
        if (sort === 'des'){
            const sortedObject = [...dataApi].sort((a,b) => {
                if (a[column] > b[column]) return -1;
                if (a[column] < b[column]) return 1;
                return 0;
            });
            setDataApi(sortedObject);
            setSort('asc');
        }
      };
      //uso es useEffect para hacer la peticion a la API al cargar la pagina
    useEffect(() => {
        getDataApi();
    }, []);

    //Método que obtiene los datos de la API
    const getDataApi = async () => {
        //url estatica donde consulto la API
        const url = 'https://api.victorsanmartin.com/feriados/en.json';
        //Con el try y catch hago manejo de errores para en caso de no conectar con la API me detalle el error
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDataApi(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    //Renderizacion de mi pagina
    return (
        <div className="feriados">
            <h2 className="text-center">Listado de Feriados en Chile (Año 2013)</h2>
            <div className="list">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {/* en la cabecera de cada columna de la tabla ejecuto el ordenamiento si es que el usuario hace click en ella, le paso por parametro el nombre del campo que viene en mi data, no el que yo le coloco en la tabla para mostrarse */}
                            <th onClick={() => handleSort("title")}>Nombre</th>
                            <th onClick={() => handleSort('date')}>Fecha</th>
                            <th>Irrenunciable</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* aqui tengo un condicional, si no he ingresado nada en el campo de busqueda me renderiza todos los datos en la tabla, si tiene datos me hace el filtro y me muestra los que coincidan solamente, el parametro de comparacion se lo paso por parametro desde App y se llama searchText y es una propiedad de props */}
                        {props.searchText === '' ? (
                            // codigo en caso de que el texto de busqueda este vacio o este iniciando la pagina
                            dataApi.map((holiday) => (
                                <tr key={holiday.index}>
                                    <td>{holiday.title}</td>
                                    <td>{holiday.date}</td>
                                    <td>
                                        {holiday.inalienable
                                            ? 'Irrenunciable'
                                            : 'Voluntario'}
                                    </td>
                                    <td>{holiday.extra}</td>
                                </tr>
                            ))
                        ) : (
                            // codigo en caso de que el texto de busqueda venga con datos
                            dataApi
                                .filter((holiday) =>
                                    holiday.title
                                        .toLowerCase()
                                        .includes(props.searchText.toLowerCase())
                                )
                                .map((holiday) => (
                                    <tr key={holiday.index}>
                                        <td>{holiday.title}</td>
                                        <td>{holiday.date}</td>
                                        <td>
                                            {holiday.inalienable
                                                ? 'Irrenunciable'
                                                : 'Voluntario'}
                                        </td>
                                        <td>{holiday.extra}</td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default MyApi;
