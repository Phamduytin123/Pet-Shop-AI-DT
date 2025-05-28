import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Button, Select, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/AdminLayout";
import { formatDateTime } from "../../utils/formatUtils";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../utils/commonUtils";
import authService from "../../service/authService";

const { Option } = Select;

const AdminAccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredRole, setFilteredRole] = useState(null);
  const [filteredActive, setFilteredActive] = useState(null);
  const navigate = useNavigate();

  const roleOptions = ["ADMIN", "SELLER", "CUSTOMER"];

  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const res = await authService.getAllAccount();
        const data = res.data;
        const formattedAccounts = data.map((acc, index) => ({
          key: index,
          id: acc.id,
          email: acc.email,
          fullName: acc.fullName,
          phoneNumber: acc.phoneNumber,
          address: acc.address,
          birthDate: formatDateTime(acc.birthDate),
          gender: acc.gender ? "Male" : "Female",
          role: acc.role,
          isActive: acc.active,
        }));
        setAccounts(formattedAccounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    };

    fetchAllAccounts();
  }, []);

  const handleToggleActive = async (accountId, newActiveStatus) => {
    try {
      const req = {
        accountId: accountId,
        isActive: newActiveStatus,
      };
      await authService.updateActivate(req);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, isActive: newActiveStatus } : acc
        )
      );
      showSuccessNotification(
        "Status Updated",
        "Account status updated successfully"
      );
    } catch (error) {
      console.error("Failed to update account status:", error);
      showErrorNotification("Update Failed", "Failed to update status");
    }
  };

  const handleChangeRole = async (accountId, newRole) => {
    try {
      const req = {
        accountId,
        role: newRole,
      };
      await authService.updateRole(req);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, role: newRole } : acc
        )
      );
      showSuccessNotification(
        "Role Updated",
        "Account role updated successfully"
      );
    } catch (error) {
      console.error("Failed to update role:", error);
      showErrorNotification("Update Failed", "Failed to update role");
    }
  };

  const roleColorMap = {
    ADMIN: "red",
    SELLER: "green",
    CUSTOMER: "blue",
  };

  const filteredAccounts = accounts.filter((acc) => {
    return (
      (!filteredRole || acc.role === filteredRole) &&
      (filteredActive === null || acc.isActive === filteredActive)
    );
  });

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Birth Date", dataIndex: "birthDate", key: "birthDate" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          value={role}
          style={{ width: 120 }}
          onChange={(value) => handleChangeRole(record.id, value)}
        >
          {roleOptions.map((r) => (
            <Option key={r} value={r}>
              <Tag color={roleColorMap[r]}>{r}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleToggleActive(record.id, checked)}
        />
      ),
    },
    {
      title: "Activity",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/admin/accounts/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div
        style={{
          padding: 24,
          marginTop: 80,
          maxWidth: 1200,
          marginInline: "auto",
        }}
      >
        <Card
          title="All Accounts"
          extra={
            <div style={{ display: "flex", gap: 16 }}>
              <Select
                allowClear
                placeholder="Filter by Role"
                style={{ width: 180 }}
                value={filteredRole}
                onChange={(value) => setFilteredRole(value)}
              >
                {roleOptions.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
              <Select
                allowClear
                placeholder="Filter by Active"
                style={{ width: 180 }}
                value={filteredActive}
                onChange={(value) =>
                  setFilteredActive(value === undefined ? null : value)
                }
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredAccounts}
            pagination={{ pageSize: 20, position: ["bottomCenter"] }}
            rowKey="email"
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminAccountsPage;
