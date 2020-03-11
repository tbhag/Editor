import cx from "classnames";
import { useState, useContext, createContext } from "react";
import { ChromeContext, ChoiceListPersist } from "../../../Chrome";

export const AccordionContext = createContext();

export const accordionVersions = {
  v1: {
    dom: props => {
      const [open, setOpen] = useState(props.open);
      return (
        <section className={props.className} onClick={props.onClick}>
          <button
            className="trigger-head"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Heading
          </button>
          {open && (
            <ul>
              <li className="list">Thing</li>
              <li className="list">Thing</li>
              <li className="list">Thing</li>
            </ul>
          )}
          <style jsx>{`
            .trigger-head {
              font-family: var(--display-font);
              text-align: left;
              display: block;
              width: 100%;
              padding: var(--padding-2);
              background: var(--bg-color);
              font-size: var(--large-size);
              color: var(--color);
            }
            .list {
              font-family: var(--font);
              padding: var(--padding-1) var(--padding-2);
              border-bottom: 1px solid var(--inner-color);
              font-size: var(--small-size);
              color: var(--inner-color);
            }
            .list:last-child {
              border-bottom: none;
            }
          `}</style>
        </section>
      );
    },
    text: "accordion 1"
  },
  v2: {
    dom: props => {
      const [open, setOpen] = useState(props.open);
      return (
        <section className={props.className} onClick={props.onClick}>
          <p
            className="trigger-head"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Heading
          </p>
          {open && (
            <ul>
              <li className="list">Thing</li>
              <li className="list">Thing</li>
              <li className="list">Thing</li>
            </ul>
          )}
          <style jsx>{`
            .trigger-head {
              font-family: var(--display-font);
              text-align: left;
              display: block;
              width: 100%;
              padding: var(--padding-2);
              border-bottom: 1px solid var(--inner-color);
              background-color: var(--bg-inner-color);
              font-size: var(--large-size);
            }
            .list {
              font-family: var(--font);
              padding: var(--padding-1) var(--padding-2);
              border-bottom: 1px solid var(--inner-color);
              font-size: var(--small-size);
            }
            .list:last-child {
              border-bottom: none;
            }
          `}</style>
        </section>
      );
    },
    text: "accordion 2"
  }
};

export const AccordionContextWrap = props => {
  const [contextVersion, setContextVersion] = useState(props.version);
  return (
    <AccordionContext.Provider
      value={{
        setContextVersion,
        contextVersion
      }}
    >
      {props.children}
    </AccordionContext.Provider>
  );
};

export const Accordion = props => {
  const { open } = props;
  const [version, setVersion] = useState(props.version);
  const [persist, setPersist] = useState(props.persist);
  const [a, setA] = useState(false);
  const { setAside, setLastA } = useContext(ChromeContext);
  const { contextVersion, setContextVersion } = useContext(AccordionContext);
  const resolvedVersion = persist ? contextVersion : version;
  const chosen = accordionVersions[resolvedVersion];
  const Component = chosen.dom;
  return (
    <Component
      className={cx("e", { a: a })}
      open={open}
      onClick={e => {
        e.stopPropagation();
        if (a) return;
        setA(true);
        setAside(
          <>
            <h3>Accordion Options</h3>
            <ChoiceListPersist
              setVersion={setVersion}
              setContextVersion={setContextVersion}
              setPersist={setPersist}
              persist={persist}
              version={version}
              contextVersion={contextVersion}
              data={accordionVersions}
            />
          </>
        );
        setLastA(setA);
      }}
    />
  );
};
