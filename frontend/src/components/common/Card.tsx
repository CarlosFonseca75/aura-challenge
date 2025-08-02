import styles from "./styles/Card.module.scss";

interface ContainerProps {
  children: React.ReactNode;
}

interface TitleProps {
  title: string;
}

interface ItemProps {
  label: string;
  text: string;
}

const Container = (props: ContainerProps) => {
  return <article className={styles.card}>{props.children}</article>;
};

const Title = (props: TitleProps) => {
  return <h2 className={styles.title}>{props.title}</h2>;
};

const Item = (props: ItemProps) => {
  return (
    <p className={styles.itemText}>
      <strong>{props.label}</strong>
      {props.text}
    </p>
  );
};

const Card = Object.assign(Container, {
  Title,
  Item,
});

export { Card };
