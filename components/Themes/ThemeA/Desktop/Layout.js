import cx from "classnames";
import { useState, useContext } from "react";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";
import { ChromeContext, ChoiceList } from "../../../Chrome";
export const layoutVersions = {
  v1: {
    dom: props => (
      <div
        className={cx("body", props.className)}
        style={props.style}
        onClick={props.onClick}
      >
        <div className="container">
          <Sidebar version="v1" />
          <Main />
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
    ),
    text: "sidebar left"
  },
  v2: {
    dom: props => (
      <div
        className={cx("body", props.className)}
        style={props.style}
        onClick={props.onClick}
      >
        <div className="container">
          <Main />
          <Sidebar version="v1" />
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
    ),
    text: "sidebar right"
  }
};

export const DesktopLayout = props => {
  const [version, setVersion] = useState(props.version);
  const [a, setA] = useState(false);
  const { setAside, setLastA } = useContext(ChromeContext);
  const chosen = layoutVersions[version];
  const Component = chosen.dom;
  return (
    <Component
      className={cx("e", { a: a })}
      style={!props.mobile ? {} : { display: "none" }}
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
