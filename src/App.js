import {useState, useEffect} from "react";
import {Table} from "antd";
import "antd/dist/antd.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(10);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "User ID",
      dataIndex: "userId",
      sorter: (record1, record2) => {
        return record1.userId < record2.userId;
      },
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => {
        return <p>{completed ? "Completed" : "In Progress"}</p>;
      },
      filters: [
        {text: "Complete", value: true},
        {text: "In Progress", value: false},
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
  ];

  return (
    <div className="App">
      <header className="app-header">
        <Table
          style={{background: "skyblue"}} //style pagination
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: page, //berada di page 4
            pageSize: sizePage, //jumlah item yang ditampilkan di column
            // total: 180,
            onChange: (page, sizePage) => {
              setPage(page);
              setSizePage(sizePage);
            },
          }}
        ></Table>
      </header>
    </div>
  );
}

export default App;
