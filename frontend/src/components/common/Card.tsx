import classNames from "classnames";
import styles from "./styles/Card.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TitleProps {
  title: string;
}

interface ItemProps {
  label: string;
  text: string;
}

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

// * This component is using a design patter called "Composite Components!"
const Container = (props: ContainerProps) => {
  return (
    <article className={classNames(styles.card, props.className)}>
      {props.children}
    </article>
  );
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

const Text = (props: TextProps) => {
  return <p className={styles.text}>{props.children}</p>;
};

const Card = Object.assign(Container, {
  Title,
  Item,
  Text,
});

export { Card };
