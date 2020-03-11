import cx from "classnames";
import { Accordion, AccordionContextWrap } from "./Accordion";
export const sidebarVersions = {
  v1: {
    dom: props => (
      <aside className={cx("sidebar", props.className)}>
        <AccordionContextWrap version="v1">
          <Accordion version="v1" open persist />
          <Accordion version="v1" open persist />
          <Accordion version="v1" open persist />
          <Accordion version="v1" open persist />
        </AccordionContextWrap>
        <style jsx>{`
          .sidebar {
            width: 200px;
            padding: var(--padding-1);
            flex-shrink: 0;
            background-color: var(--inner-bg-color);
            color: var(--inner-color);
          }
        `}</style>
      </aside>
    ),
    text: "sidebar"
  }
};

export const Sidebar = props => {
  const { version } = props;
  const chosen = sidebarVersions[version];
  const Component = chosen.dom;
  return <Component />;
};
