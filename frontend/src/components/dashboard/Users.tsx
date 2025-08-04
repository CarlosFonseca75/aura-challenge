import { getUsers } from "./services";
import { Table } from "@/components/common/Table";
import { Dayjs } from "@/utils/date";
import { User } from "@/common/types";
import styles from "./styles/Users.module.scss";

// * This is a server side component.
const Users = async () => {
  // TODO: Improve the design of error and empty states.
  // TODO: Add pagination to limit the number of displayed users.
  // TODO: Add filtering by name, email, first name, etc., and persist filters in the URL.

  const res = await getUsers();

  if (!res.success) return <p>Oops, something went wrong!</p>;

  if (!res.data?.length) return <p>No users found!</p>;

  return (
    <Table className={styles.table}>
      <Table.Header
        columns={[
          "Email",
          "First Name",
          "Last Name",
          "Created At",
          "Updated At",
        ]}
      />
      <Table.Body>
        {res.data.map((user: User, index: number) => (
          <Table.Row key={index}>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{Dayjs.fromNow(user.createdAt)}</Table.Cell>
            <Table.Cell>{Dayjs.fromNow(user.updatedAt)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export { Users };
