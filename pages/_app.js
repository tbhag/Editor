import React from "react";
import App from "next/app";
import { ChromeContext } from "../components/Chrome";

export default class MyApp extends App {
  state = {
    aside: null,
    lastA: () => {}
  };

  setAside = aside => {
    if (this.state.lastA) this.state.lastA();
    this.setState({
      ...this.state.lastA,
      aside
    });
  };

  setLastA = lastA => {
    this.setState({
      ...this.state.aside,
      lastA
    });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ChromeContext.Provider
        value={{
          aside: this.state.aside,
          setAside: this.setAside,
          lastA: this.state.lastA,
          setLastA: this.setLastA
        }}
      >
        <Component {...pageProps} />
      </ChromeContext.Provider>
    );
  }
}
