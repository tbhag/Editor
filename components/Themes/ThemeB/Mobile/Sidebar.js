import cx from "classnames";
import { AccordionContextWrap } from "./Accordion";
import { FAKE, pfa } from "../../../data";

const cmap = {
  accordioncontextwrap: AccordionContextWrap
};

export const sidebarVersions = {
  1: {
    dom: props => {
      const A = cmap[props.data.AccordionContextWrap.type.toLowerCase()];
      return (
        <aside className={cx("sidebar", props.className)}>
          <A
            version={props.data.AccordionContextWrap.version}
            data={pfa(
              props.data.AccordionContextWrap.children,
              FAKE.components
            )}
          />
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
      );
    },
    text: "sidebar"
  }
};

export const Sidebar = props => {
  const { version } = props;
  const chosen = sidebarVersions[version];
  const Component = chosen.dom;
  return <Component data={props.data} />;
};
