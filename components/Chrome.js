import cx from "classnames";
import { useState, useContext, createContext } from "react";
import {
  ThemeA,
  ThemeASettings,
  ThemeASettingsContextWrap
} from "./Themes/ThemeA/Theme";

export const ChromeContext = createContext();

export const ChoiceList = props => {
  const { data, setVersion, version } = props;
  const keys = Object.keys(data);
  const list = keys.map(key => (
    <li key={key}>
      <label>
        <input
          type="radio"
          name="choices"
          defaultChecked={key === version}
          onClick={() => setVersion(key)}
        />
        {data[key].text}
      </label>
    </li>
  ));
  return <ul>{list}</ul>;
};

export const ChoiceListPersist = props => {
  const {
    setVersion,
    version,
    setContextVersion,
    contextVersion,
    data
  } = props;
  const [persist, setPersist] = useState(props.persist);
  return (
    <>
      <label>
        <input
          type="checkbox"
          defaultChecked={persist}
          onChange={() => {
            setPersist(!persist);
            props.setPersist(!persist);
          }}
        />
        Perist
      </label>
      <ChoiceList
        setVersion={persist ? setContextVersion : setVersion}
        version={persist ? contextVersion : version}
        data={data}
      />
    </>
  );
};

export const DownView = () => (
  <style jsx global>{`
    .e {
      transform-origin: center center;
      overflow: hidden;
    }
    .dvu .e {
      transform: scale(0.95, 0.95);
      box-shadow: 4px 4px 9px gray;
      outline: 1px solid hsl(248, 100%, 80%);
    }
    .dvu .e > .e {
      transform: scale(0.9, 0.9);
    }
    .dvu .a {
      outline: 1px solid red;
    }
  `}</style>
);

export const ChromeContent = props => {
  const { mobile, children, downView } = props;
  const { setAside, setLastA } = useContext(ChromeContext);
  return (
    <section
      className="chrome-content"
      onClick={() => {
        setAside(false);
        setLastA(() => {});
      }}
    >
      <div
        className={cx("chrome-screen dvu", {
          "chrome-screen-desktop": !mobile,
          "chrome-screen-mobile": mobile
        })}
      >
        {children}
      </div>
      {downView && <DownView />}
      <style jsx>{`
        .chrome-content {
          min-height: calc(100vh - 30px);
          padding: 20px;
        }
        .chrome-content {
          display: flex;
          width: 100%;
          background-color: lightgray;
        }
        .chrome-screen {
          margin: auto;
          background-color: white;
          border-radius: 3px;
          min-height: 100%;
          overflow: hidden;
          display: flex;
        }
        .chrome-screen-desktop {
          width: 960px;
        }
        .chrome-screen-mobile {
          width: 320px;
        }
      `}</style>
    </section>
  );
};
export const Chrome = props => {
  const [hide, setHide] = useState(props.hide);
  const [mobile, setMobile] = useState(props.mobile);
  const [dark, setDark] = useState(props.dark);
  const [downView, setDownView] = useState(props.downView);
  const { aside, setAside, setLastA } = useContext(ChromeContext);
  return (
    <>
      <header className="chrome-header">
        <select>
          <option value="v1">Theme A</option>
        </select>
        <label>
          <input
            type="checkbox"
            defaultChecked={!hide}
            onChange={() => {
              setHide(!hide);
            }}
          />
          {"Sidebar"}
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked={dark}
            onChange={() => {
              setDark(!dark);
            }}
          />
          {"Dark"}
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked={mobile}
            onChange={() => {
              setMobile(!mobile);
              setAside(false);
              setLastA(() => {});
            }}
          />
          {"Mobile"}
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked={downView}
            onChange={() => {
              setDownView(!downView);
            }}
          />
          {"DownView®"}
        </label>
        <strong className="logo">☆TBHAG's Editor</strong>
      </header>
      <div className={cx("chrome-wrap", { "chrome-hide": hide })}>
        <ThemeASettingsContextWrap>
          <section className="chrome-aside">
            {aside || <ThemeASettings dark={dark} mobile={mobile} />}
          </section>
          <ChromeContent mobile={mobile} downView={downView}>
            <ThemeA mobile={mobile} dark={dark} />
          </ChromeContent>
        </ThemeASettingsContextWrap>
      </div>
      <style jsx global>{`
        .chrome-aside h3,
        .chrome-aside strong {
          font-weight: bold;
        }
        .chrome-aside p {
          margin-bottom: 10px;
        }
        .a {
          outline: 1px solid red;
          transform: scale(0.997, 0.997);
        }
        .e {
          transition: 0.15s linear;
        }
      `}</style>
      <style jsx>{`
        .chrome-header,
        .chrome-aside {
          font-family: arial;
        }
        .chrome-header strong {
          font-weight: bold;
        }
        .chrome-header .logo {
          transform: rotate(-3deg);
          display: inline-block;
          color: #d96b7e;
        }
        .chrome-header {
          padding: 5px;
          background-color: pink;
          border-bottom: 1px solid gray;
          height: 30px;
        }
        .chrome-aside {
          background-color: white;
          width: 300px;
          flex-shrink: 0;
        }
        .chrome-aside {
          min-height: calc(100vh - 30px);
          padding: 20px;
        }
        .chrome-wrap {
          display: flex;
        }
        .chrome-hide {
          transform: translateX(-300px);
          width: calc(100% + 300px);
        }
        .chrome-aside-toggle-off {
          border-radius: 5px;
          padding: 5px 10px;
          color: white;
          position: absolute;
          background-color: black;
        }
      `}</style>
    </>
  );
};
