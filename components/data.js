// populate for object
export const pfo = (data, components) => {
  return Object.keys(data).reduce((acc, curr) => {
    acc[curr] = components[data[curr]];
    return acc;
  }, {});
};

// populate for array
export const pfa = (data, components) => {
  return Object.keys(data).reduce((acc, curr) => {
    acc.push(components[data[curr]]);
    return acc;
  }, []);
};

// Fake data const
export const FAKE = {
  meta: {},
  theme: {
    id: 2,
    name: "ThemeB",
    school_id: 2,
    created_at: "2020-07-02T16:47:52.219Z",
    updated_at: "2020-07-02T16:47:52.224Z"
  },
  components: {
    "1": {
      id: 1,
      name: null,
      type: "Chrome",
      content: {},
      version: 1,
      contexts: {},
      parent: null,
      children: { SettingsContextWrap: 2, Settings: 3, Theme: 4 }
    },
    "2": {
      id: 2,
      name: "ThemeBSettingsContextWrap",
      type: "SettingsContextWrap",
      content: {},
      version: 1,
      contexts: {},
      parent: 1,
      children: null
    },
    "3": {
      id: 3,
      name: "ThemeBSettings",
      type: "Settings",
      content: {},
      version: 1,
      contexts: {},
      parent: 1,
      children: null
    },
    "4": {
      id: 4,
      name: "ThemeB",
      type: "Theme",
      content: {},
      version: 1,
      contexts: {},
      parent: 1,
      children: { DesktopLayout: 18, MobileLayout: 28 }
    },
    "18": {
      id: 18,
      name: null,
      type: "DesktopLayout",
      content: {},
      version: 1,
      contexts: {},
      parent: 4,
      children: { Sidebar: 21, Main: 23 }
    },
    "21": {
      id: 21,
      name: null,
      type: "Sidebar",
      content: {},
      version: 1,
      parent: 18,
      children: { AccordionContextWrap: 24 }
    },
    "23": {
      id: 23,
      name: null,
      type: "Main",
      content: {
        text:
          "You have power over your mind – not outside events. Realize this, and you will find strength. ~ Marcus Aurelius"
      },
      version: 1,
      parent: 18,
      children: null
    },
    "24": {
      id: 24,
      name: null,
      type: "AccordionContextWrap",
      content: null,
      version: 2,
      parent: 21,
      children: [25, 26, 27]
    },
    "25": {
      id: 25,
      name: null,
      type: "Accordion",
      content: { heading_text: "Heading 1", text: "text 1" },
      version: 1,
      parent: 24,
      persist: false,
      children: null
    },
    "26": {
      id: 26,
      name: null,
      type: "Accordion",
      content: { heading_text: "Heading 2", text: "text 2" },
      version: 1,
      parent: 24,
      persist: false,
      children: null
    },
    "27": {
      id: 27,
      name: null,
      type: "Accordion",
      content: { heading_text: "Heading 3", text: "text 3" },
      version: 1,
      parent: 24,
      persist: false,
      children: null
    },
    "28": {
      id: 28,
      name: null,
      type: "MobileLayout",
      content: {},
      version: 2,
      contexts: {},
      parent: 4,
      children: { Sidebar: 29, Main: 30 }
    },
    "29": {
      id: 29,
      name: null,
      type: "Sidebar",
      content: {},
      version: 1,
      parent: 28,
      children: { AccordionContextWrap: 31 }
    },
    "30": {
      id: 30,
      name: null,
      type: "Main",
      content: {
        text:
          "You have power over your mind – not outside events. Realize this, and you will find strength. ~ Marcus Aurelius"
      },
      version: 1,
      parent: 28,
      children: null
    },
    "31": {
      id: 31,
      name: null,
      type: "AccordionContextWrap",
      content: null,
      version: 1,
      parent: 29,
      children: [32, 33, 34]
    },
    "32": {
      id: 32,
      name: null,
      type: "Accordion",
      content: { heading_text: "Heading 1", text: "text 1" },
      version: 2,
      parent: 31,
      persist: false,
      children: null
    },
    "33": {
      id: 33,
      name: null,
      type: "Accordion",
      content: { heading_text: "Heading 2", text: "text 2" },
      version: 2,
      parent: 31,
      persist: false,
      children: null
    },
    "34": {
      id: 34,
      name: null,
      type: "Accordion",
      content: { heading_text: "Heading 3", text: "text 3" },
      version: 2,
      parent: 31,
      persist: false,
      children: null
    }
  }
};
