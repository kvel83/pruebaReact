import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";

const MyApi = (props) => {
    const [dataApi, setDataApi] = useState([]);
    const [sort, setSort] = useState('asc');
    const handleSort = (column) => {
        if (sort === 'asc'){
            const sortedObject = [...dataApi].sort((a,b) => {
                if (a[column] < b[column]) return -1;
                if (a[column] > b[column]) return 1;
                return 0;
            });
            setDataApi(sortedObject);
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
    useEffect(() => {
        getDataApi();
    }, []);
    const getDataApi = async () => {
        const url = 'https://api.victorsanmartin.com/feriados/en.json';
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setDataApi(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="feriados">
            <div className="list">
                <Table striped bordered hover responsive className="text-bg-light mt-3">
                    <thead>
                        <tr>
                            <th className="bg-secondary text-light fs-5 text-center" onClick={() => handleSort("title")}>Nombre</th>
                            <th className="bg-secondary text-light fs-5 text-center" onClick={() => handleSort('date')}>Fecha</th>
                            <th className="bg-secondary text-light fs-5 text-center" onClick={() => handleSort('inalienable')}>Irrenunciable</th>
                            <th className="bg-secondary text-light fs-5 text-center" onClick={() => handleSort('extra')}>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.searchText === '' ? (
                            dataApi.map((holiday) => (
                                <tr key={holiday.index}>
                                    <td>{holiday.title}</td>
                                    <td>{holiday.date.split("-")[2]+"/"+holiday.date.split("-")[1]+"/"+holiday.date.split("-")[0]}</td>
                                    <td>
                                        {holiday.inalienable
                                            ? 'Irrenunciable'
                                            : 'Voluntario'}
                                    </td>
                                    <td>{holiday.extra}</td>
                                </tr>
                                )
                            )
                        ) : (
                            dataApi
                                .filter((holiday) =>
                                    holiday.title
                                        .toLowerCase()
                                        .includes(props.searchText.toLowerCase()) ||
                                    holiday.date
                                        .toLowerCase()
                                        .includes(props.searchText.toLowerCase()) ||
                                    holiday.extra
                                        .toLowerCase()
                                        .includes(props.searchText.toLowerCase())
                                )
                                .map((holiday) => (
                                    <tr key={holiday.index}>
                                        <td>{holiday.title}</td>
                                        <td>{holiday.date.split("-")[2]+"/"+holiday.date.split("-")[1]+"/"+holiday.date.split("-")[0]}</td>
                                        <td>
                                            {holiday.inalienable
                                                ? 'Irrenunciable'
                                                : 'Voluntario'}
                                        </td>{holiday.extra}<td>
                                        </td>
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
