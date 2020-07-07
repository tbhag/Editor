import cx from "classnames";
export const mainVersions = {
  1: {
    dom: props => (
      <section className={cx("main", props.className)}>
        <p>{props.content.text}</p>
        <style jsx>{`
          .main {
            width: 100%;
            padding: var(--padding-3);
            font-family: var(--font);
            color: var(--color);
          }
        `}</style>
      </section>
    ),
    text: "main"
  }
};

export const Main = props => {
  const { version, content } = props;
  const chosen = mainVersions[version];
  const Component = chosen.dom;
  return <Component content={content} />;
};
