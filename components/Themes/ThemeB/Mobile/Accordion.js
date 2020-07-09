import cx from "classnames";
import { useState, useContext, createContext } from "react";
import { ChromeContext, ChoiceListPersist } from "../../../Chrome";

export const AccordionContext = createContext();

export const accordionVersions = {
  1: {
    text: "accordion 1",
    dom: props => {
      const [open, setOpen] = useState(props.open);
      const { heading_text, text } = props.content;
      return (
        <section className={props.className} onClick={props.onClick}>
          <button
            className="trigger-head"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {heading_text}
          </button>
          {open && (
            <ul>
              <li className="list">{text}</li>
              <li className="list">{text}</li>
              <li className="list">{text}</li>
            </ul>
          )}
          <style jsx>{`
            .trigger-head {
              font-family: var(--display-font);
              text-align: left;
              display: block;
              width: 100%;
              padding: var(--padding-2);
              font-size: var(--small-size);
              background: var(--bg-color);
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
    }
  },
  2: {
    text: "accordion 2",
    dom: props => {
      const [open, setOpen] = useState(props.open);
      const { heading_text, text } = props.content;
      return (
        <section className={props.className} onClick={props.onClick}>
          <p
            className="trigger-head"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {heading_text}
          </p>
          {open && (
            <ul>
              <li className="list">{text}</li>
              <li className="list">{text}</li>
              <li className="list">{text}</li>
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
    }
  }
};

export const Accordion = props => {
  const { open, id, content } = props;
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
      id={id}
      content={content}
      open={open}
      onClick={e => {
        e.stopPropagation();
        if (a) return;
        setA(true);
        setAside(
          <>
            <h3>Accordion Options</h3>
            <ChoiceListPersist
              key={id}
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

const cmap = {
  accordion: Accordion
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
      {props.data.map((child, index) => {
        const A = cmap[child.type.toLowerCase()];
        return (
          <A
            version={child.version}
            id={child.id}
            key={index}
            persist={child.persist}
            content={child.content}
          />
        );
      })}
    </AccordionContext.Provider>
  );
};
