import { getUsers } from "./services";
import { Table } from "@/components/common/Table";
import styles from "./styles/Users.module.scss";

const Users = async () => {
  const res = await getUsers();

  if (!res.success) return <p>Oops, something went wrong!</p>;

  if (!res.data?.length) return <p>No users found!</p>;

  return (
    <Table className={styles.table}>
      <Table.Header columns={["Email", "First Name", "Last Name"]} />
      <Table.Body>
        {res.data.map((user: any, index: number) => (
          <Table.Row key={index}>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export { Users };
