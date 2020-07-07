import cx from "classnames";
export const mainVersions = {
  dom: props => (
    <section className={cx("main", props.className)}>
      {"Main Content Area"}
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
};

export const Main = () => {
  const chosen = mainVersions;
  const Component = chosen.dom;
  return <Component />;
};
