export const EPUBJS_VERSION = "0.3";

// Dom events to listen for
export const DOM_EVENTS = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "mousemove", "click", "touchend", "touchstart", "touchmove", "contextmenu"];

export const EVENTS = {
  BOOK: {
    OPEN_FAILED: "openFailed"
  },
  CONTENTS: {
    EXPAND: "CONTENTS expand",
    RESIZE: "CONTENTS resize",
    SELECTED: "CONTENTS selected",
    SELECTED_RANGE: "CONTENTS selectedRange",
    LINK_CLICKED: "CONTENTS linkClicked"
  },
  LOCATIONS: {
    CHANGED: "LOCATIONS changed"
  },
  MANAGERS: {
    RESIZE: "resize",
    RESIZED: "resized",
    ORIENTATION_CHANGE: "orientationchange",
    ADDED: "added",
    SCROLL: "scroll",
    SCROLLED: "scrolled",
    REMOVED: "removed",
  },
  VIEWS: {
    AXIS: "VIEWS axis",
    WRITING_MODE: "VIEWS writingMode",
    LOAD_ERROR: "VIEWS loaderror",
    RENDERED: "VIEWS rendered",
    RESIZED: "VIEWS resized",
    DISPLAYED: "VIEWS displayed",
    SHOWN: "VIEWS shown",
    HIDDEN: "VIEWS hidden",
    MARK_CLICKED: "VIEWS markClicked"
  },
  RENDITION: {
    STARTED: "RENDITION started",
    ATTACHED: "RENDITION attached",
    DISPLAYED: "RENDITION displayed",
    DISPLAY_ERROR: "RENDITION displayerror",
    RENDERED: "RENDITION rendered",
    REMOVED: "RENDITION removed",
    RESIZED: "RENDITION resized",
    ORIENTATION_CHANGE: "RENDITION orientationchange",
    LOCATION_CHANGED: "RENDITION locationChanged",
    RELOCATED: "RENDITION relocated",
    MARK_CLICKED: "RENDITION markClicked",
    SELECTED: "RENDITION selected",
    LAYOUT: "RENDITION layout"
  },
  LAYOUT: {
    UPDATED: "LAYOUT updated"
  },
  ANNOTATION: {
    ATTACH: "ANNOTATION attach",
    DETACH: "ANNOTATION detach"
  }
}
