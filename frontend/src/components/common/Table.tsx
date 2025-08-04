import classNames from "classnames";
import styles from "./styles/Table.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface HeaderProps {
  columns: string[];
}

interface BodyProps {
  children: React.ReactNode;
}

interface RowProps {
  children: React.ReactNode;
}

interface CellProps {
  children: React.ReactNode;
}

// * This component is using a design patter called "Composite Components!"
const Container = (props: ContainerProps) => {
  return (
    <div className={styles.container}>
      <table
        className={classNames(styles.table, props.className)}
        cellSpacing="0"
        cellPadding="0"
      >
        {props.children}
      </table>
    </div>
  );
};

const Header = (props: HeaderProps) => {
  return (
    <thead>
      <tr>
        {props.columns.map((col, i) => (
          <th key={i} className={styles.column}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Body = (props: BodyProps) => {
  return <tbody>{props.children}</tbody>;
};

const Row = (props: RowProps) => {
  return <tr className={styles.row}>{props.children}</tr>;
};

const Cell = (props: CellProps) => {
  return <td className={styles.cell}>{props.children}</td>;
};

const Table = Object.assign(Container, {
  Header,
  Body,
  Row,
  Cell,
});

export { Table };
