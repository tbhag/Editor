import { useState, useContext, createContext } from "react";
import { DesktopLayout } from "./Desktop/Layout";
import { FAKE, pfo } from "../../data";

const cmap = {
  desktoplayout: DesktopLayout
};

export const SettingsContext = createContext();

export const defaultLightOptions = {
  innerBGColor: "#000000",
  innerColor: "#ffffff",
  bgColor: "#ffffff",
  color: "#000000"
};
export const defaultDarkOptions = {
  innerBGColor: "#ffffff",
  innerColor: "#000000",
  bgColor: "#000000",
  color: "#ffffff"
};
export const defaultFontOptions = {
  font: "arial",
  displayFont: "georgia"
};
export const defaultSpacingOptions = {
  padding3: "20",
  padding2: "10",
  padding1: "5"
};
export const defaultFontSizeOptions = {
  small: "12",
  large: "20"
};
export const defaultFonts = ["arial", "verdana", "times", "georgia"];

export const SettingsAside = props => {
  const { obj, weakmap, onChange, id } = props;
  const component = weakmap.get(obj);
  return (
    <ul className="list">
      {Object.keys(obj).map(key => (
        <li key={key}>
          <label>
            {key}
            {component === "color" && (
              <input
                type="color"
                key={id}
                defaultValue={obj[key]}
                onChange={e => {
                  onChange({ ...obj, [key]: e.target.value });
                }}
              />
            )}
            {component === "font" && (
              <select
                defaultValue={obj[key]}
                onChange={e => {
                  onChange({ ...obj, [key]: e.target.value });
                }}
              >
                {defaultFonts.map(item => (
                  <option key={item + key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            )}
            {component === "size" && (
              <input
                type="range"
                defaultValue={obj[key]}
                min="0"
                max="100"
                onChange={e => {
                  onChange({ ...obj, [key]: e.target.value });
                }}
              ></input>
            )}
          </label>
        </li>
      ))}
      <style jsx>{`
        .list {
          margin-bottom: 20px;
        }
      `}</style>
    </ul>
  );
};

export const ThemeBSettingsContextWrap = props => {
  const [contextLightOptions, setContextLightOptions] = useState(
    defaultLightOptions
  );
  const [contextDarkOptions, setContextDarkOptions] = useState(
    defaultDarkOptions
  );
  const [contextFontOptions, setContextFontOptions] = useState(
    defaultFontOptions
  );
  const [contextFontSizeOptions, setContextFontSizeOptions] = useState(
    defaultFontSizeOptions
  );
  const [contextSpacingOptions, setContextSpacingOptions] = useState(
    defaultSpacingOptions
  );
  return (
    <SettingsContext.Provider
      value={{
        contextLightOptions,
        setContextLightOptions,
        contextDarkOptions,
        setContextDarkOptions,
        contextFontOptions,
        setContextFontOptions,
        contextFontSizeOptions,
        setContextFontSizeOptions,
        contextSpacingOptions,
        setContextSpacingOptions
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const ThemeBSettings = props => {
  const {
    contextLightOptions,
    setContextLightOptions,
    contextDarkOptions,
    setContextDarkOptions,
    contextFontOptions,
    setContextFontOptions,
    contextFontSizeOptions,
    setContextFontSizeOptions,
    contextSpacingOptions,
    setContextSpacingOptions
  } = useContext(SettingsContext);
  const weakmap = new WeakMap();
  weakmap.set(contextLightOptions, "color");
  weakmap.set(contextDarkOptions, "color");
  weakmap.set(contextFontOptions, "font");
  weakmap.set(contextFontSizeOptions, "size");
  weakmap.set(contextSpacingOptions, "size");
  return (
    <>
      <h3>{props.mobile ? "Mobile" : "Desktop"}</h3>
      <p>{`Click on something to change the design of your page.`}</p>
      <p>
        {`For a better view on what you can edit, activate `}
        <strong>DownView</strong>
      </p>
      {!props.dark ? (
        <>
          <h3>Colors (Normal)</h3>
          <SettingsAside
            obj={contextLightOptions}
            weakmap={weakmap}
            onChange={setContextLightOptions}
            id={"normal"}
          />
        </>
      ) : (
        <>
          <h3>Colors (DarkMode)</h3>
          <SettingsAside
            obj={contextDarkOptions}
            weakmap={weakmap}
            onChange={setContextDarkOptions}
            id={"dark"}
          />
        </>
      )}

      <p>
        Just to show range of style options that can be configured at the global
        or component level.
      </p>
      <h3>Spacing</h3>
      <SettingsAside
        obj={contextSpacingOptions}
        weakmap={weakmap}
        onChange={setContextSpacingOptions}
      />
      <h3>Fonts</h3>
      <SettingsAside
        obj={contextFontOptions}
        weakmap={weakmap}
        onChange={setContextFontOptions}
      />
      <h3>Font Sizes</h3>
      <SettingsAside
        obj={contextFontSizeOptions}
        weakmap={weakmap}
        onChange={setContextFontSizeOptions}
      />
    </>
  );
};

export const ThemeB = props => {
  const {
    contextLightOptions,
    contextDarkOptions,
    contextFontOptions,
    contextFontSizeOptions,
    contextSpacingOptions
  } = useContext(SettingsContext);

  const mode = props.dark ? contextDarkOptions : contextLightOptions;
  const { mobile, data } = props;
  const A = cmap[data.DesktopLayout.type.toLowerCase()];
  return (
    <>
      <A
        mobile={mobile}
        version={data.DesktopLayout.version}
        data={pfo(data.DesktopLayout.children, FAKE.components)}
      />
      <style jsx global>{`
        :root {
          --inner-bg-color: ${mode.innerBGColor};
          --inner-color: ${mode.innerColor};
          --bg-color: ${mode.bgColor};
          --color: ${mode.color};
          --font: ${contextFontOptions.font};
          --display-font: ${contextFontOptions.displayFont};
          --padding-1: ${contextSpacingOptions.padding1}px;
          --padding-2: ${contextSpacingOptions.padding2}px;
          --padding-3: ${contextSpacingOptions.padding3}px;
          --large-size: ${contextFontSizeOptions.large}px;
          --small-size: ${contextFontSizeOptions.small}px;
        }
      `}</style>
    </>
  );
};
