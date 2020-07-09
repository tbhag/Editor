import cx from "classnames";
import { useState, useContext } from "react";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";
import { ChromeContext, ChoiceList } from "../../../Chrome";
import { FAKE, pfo } from "../../../data";
const cmap = {
  sidebar: Sidebar,
  main: Main
};
export const layoutVersions = {
  1: {
    dom: props => {
      const A = cmap[props.data.Sidebar.type.toLowerCase()];
      const B = cmap[props.data.Main.type.toLowerCase()];
      return (
        <div
          className={cx("body", props.className)}
          style={props.style}
          onClick={props.onClick}
        >
          <div className="container">
            <A
              version={props.data.Sidebar.version}
              data={pfo(props.data.Sidebar.children, FAKE.components)}
            />
            <B
              version={props.data.Main.version}
              content={props.data.Main.content}
            />
          </div>
          <style jsx>{`
            .body {
              background-color: var(--bg-color);
              color: var(--color);
              font-family: var(--font);
              display: flex;
              width: 100%;
            }
            .container {
              display: flex;
              width: 100%;
            }
          `}</style>
        </div>
      );
    },
    text: "sidebar left"
  },
  2: {
    dom: props => {
      const A = cmap[props.data.Sidebar.type.toLowerCase()];
      const B = cmap[props.data.Main.type.toLowerCase()];
      return (
        <div
          className={cx("body", props.className)}
          style={props.style}
          onClick={props.onClick}
        >
          <div className="container">
            <B
              version={props.data.Main.version}
              content={props.data.Main.content}
            />
            <A
              version={props.data.Sidebar.version}
              data={pfo(props.data.Sidebar.children, FAKE.components)}
            />
          </div>
          <style jsx>{`
            .body {
              background-color: var(--bg-color);
              color: var(--color);
              font-family: var(--font);
              display: flex;
              width: 100%;
            }
            .container {
              display: flex;
              width: 100%;
            }
          `}</style>
        </div>
      );
    },
    text: "sidebar right"
  }
};

export const MobileLayout = props => {
  const [version, setVersion] = useState(props.version);
  const [a, setA] = useState(false);
  const { setAside, setLastA } = useContext(ChromeContext);
  const chosen = layoutVersions[version];
  const Component = chosen.dom;
  return (
    <Component
      className={cx("e", { a: a })}
      style={props.mobile ? {} : { display: "none" }}
      data={props.data}
      onClick={e => {
        e.stopPropagation();
        if (a) return;
        setA(true);
        setAside(
          <>
            <h3>Layout options</h3>
            <ChoiceList
              setVersion={setVersion}
              version={version}
              data={layoutVersions}
            />
          </>
        );
        setLastA(setA);
      }}
    />
  );
};
