import { Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  DELETE_USER,
  FETCH_USER,
  BLOCK_USER,
  UNBLOCK_USER,
} from "../../services/authServices";
import moment from "moment";
import "./List.css";
import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

function List() {
  const [filteredData, setFilteredData] = useState([]);
  const [userId, setUserId] = useState("");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setUserId(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("token");
  const currentId = localStorage.getItem("id");

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const fetchData = async () => {
    const { data } = await FETCH_USER();
    console.log("data", data);

    if (data) {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = useCallback(async (id) => {
    console.log("go");
    const data = await DELETE_USER(id);
    if (data) {
      message.success("User deleted successfully");
      fetchData();
    }
  }, []);

  const blockUser = useCallback(async (id) => {
    const data = await BLOCK_USER(id);

    if (data && currentId == id) {
      logout();
    } else {
      message.success("User blocked successfully");
      fetchData();
    }
  }, []);

  const unBlockUser = useCallback(async (id) => {
    console.log("go");
    const data = await UNBLOCK_USER(id);
    if (data) {
      message.success("User unBlocked successfully");
      fetchData();
    }
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      align: "center",
      render: (value, text, record) => (text ? `${text._id}` : "N/A"),
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
      render: (value, text, record) => (text ? `${text.username}` : "N/A"),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      render: (value, text, record) => (text ? `${text.email}` : "N/A"),
    },
    {
      title: "Register time",
      dataIndex: "registerDate",
      align: "center",
      render: (value, record) => {
        const registerDate = moment(record?.registerDate).format(
          "hh:mm DD.MM.YYYY "
        );
        return <span>{registerDate}</span>;
      },
    },
    {
      title: "Last login time",
      dataIndex: "lastLoginDate",
      align: "center",
      render: (value, record) => {
        const lastLoginDate = moment(record?.lastLoginDate).format(
          "hh:mm DD.MM.YYYY "
        );
        return <span>{lastLoginDate}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (value, text, record) => {
        if (text.isBlocked) {
          return <span className="block">block</span>;
        } else {
          return <span className="active">active</span>;
        }
      },
    },
  ];
  return (
    <div className="list">
      {jwtToken && (
        <div className="container">
          <div className="list-btn-group">
            <Button
              type="primary"
              onClick={() => blockUser(userId)}
              danger
              style={{ margin: "0 15px" }}
            >
              Block
              <LockOutlined />
            </Button>
            <UnlockOutlined
              onClick={() => unBlockUser(userId)}
              style={{ fontSize: "27px", color: " #2b45db", margin: "0 15px" }}
            />
            <DeleteOutlined
              onClick={() => handleDelete(userId)}
              style={{ fontSize: "27px", color: "red", margin: "0 15px" }}
            />
            <Button
              type="primary"
              danger
              onClick={logout}
              style={{ margin: "0 15px" }}
            >
              Sign out
            </Button>
          </div>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            size="small"
            rowKey="_id"
            dataSource={filteredData}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
}
export default List;
