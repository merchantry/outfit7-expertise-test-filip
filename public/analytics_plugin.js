"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // analytics_plugin/utils/helpers.ts
  function randomHex(length) {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * 16).toString(16)
    ).join("");
  }
  function randomUUID() {
    return `${randomHex(8)}-${randomHex(4)}-${randomHex(4)}-${randomHex(
      4
    )}-${randomHex(12)}`;
  }
  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  // analytics_plugin/config.ts
  var LOCAL_STORAGE_KEY = "outfit7-expertise-app-events";
  var FILE_NAME = "analytics_plugin.js";
  var API_URL = "http://localhost:3000";

  // analytics_plugin/utils/scriptElement.ts
  function getAnalyticsScriptTag() {
    const scripts = document.getElementsByTagName("script");
    for (const script of Array.from(scripts)) {
      if (script.src && script.src.includes(FILE_NAME)) {
        return script;
      }
    }
    return null;
  }
  function getApiKeyFromScriptTag() {
    const scriptTag = getAnalyticsScriptTag();
    if (!scriptTag) return null;
    const srcUrl = new URL(scriptTag.src);
    return srcUrl.searchParams.get("apiKey");
  }

  // analytics_plugin/services/api/api.ts
  var api = {
    fetch(route) {
      return __async(this, null, function* () {
        const response = yield fetch(`${API_URL}/${route}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${route}: ${response.statusText}`);
        }
        return response.json();
      });
    },
    post(route, data) {
      return __async(this, null, function* () {
        const response = yield fetch(`${API_URL}/${route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error(`Failed to post to ${route}: ${response.statusText}`);
        }
        return response.json();
      });
    }
  };
  var api_default = api;

  // analytics_plugin/services/api/routes.ts
  function fetchEvents(projectId) {
    return __async(this, null, function* () {
      return api_default.fetch(`projects/${projectId}/events`);
    });
  }
  function fetchProjectData(apiKey) {
    return __async(this, null, function* () {
      return api_default.fetch(`projects/by-api-key/${apiKey}`);
    });
  }
  function saveEventsToServer(events) {
    return __async(this, null, function* () {
      const result = yield api_default.post("logs", events);
      console.log(`Sent ${events.length} events to the server`, result);
      return result.count === events.length;
    });
  }

  // analytics_plugin/services/localStorage/index.ts
  function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "null") || void 0;
  }
  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // analytics_plugin/services/localStorage/events.ts
  function getEventsFromLocalStorage() {
    var _a;
    return (_a = getLocalStorage(LOCAL_STORAGE_KEY)) != null ? _a : [];
  }
  function addEventsToLocalStorage(events) {
    const existingEvents = getLocalStorage(LOCAL_STORAGE_KEY);
    const updatedEvents = [...existingEvents != null ? existingEvents : [], ...events];
    setLocalStorage(LOCAL_STORAGE_KEY, updatedEvents);
  }
  function clearEventsFromLocalStorage() {
    setLocalStorage(LOCAL_STORAGE_KEY, []);
  }

  // analytics_plugin/utils/dom.ts
  function traverseParents(element, callback) {
    let el = element;
    while (el && el.nodeType === Node.ELEMENT_NODE) {
      callback(el);
      el = el.parentElement;
    }
  }
  function getElementUniqueKey(element) {
    const id = element.id || "no-id";
    const classList = Array.from(element.classList).sort().join(".");
    const elementType = element.tagName.toLowerCase();
    return `[${id}]-[${classList}]-[${elementType}]`;
  }

  // analytics_plugin/utils/MatchingElementsStorage.ts
  var MatchingElementsStorage = class {
    constructor(idMap2, classMap2, timestamp, url, sessionId2) {
      this.idMap = idMap2;
      this.classMap = classMap2;
      this.timestamp = timestamp;
      this.url = url;
      this.sessionId = sessionId2;
      __publicField(this, "matches");
      this.matches = {};
    }
    get matchesArray() {
      return Object.values(this.matches);
    }
    isElementAdded(key) {
      return key in this.matches;
    }
    addIfNotExists(matchData) {
      if (this.isElementAdded(matchData.key)) return;
      this.matches[matchData.key] = matchData;
    }
    createPartialMatchData(element) {
      return {
        key: getElementUniqueKey(element),
        timestamp: this.timestamp,
        url: this.url,
        sessionId: this.sessionId
      };
    }
    createIdMatchData(element) {
      return __spreadProps(__spreadValues({}, this.createPartialMatchData(element)), {
        matchType: "id",
        eventId: this.idMap[element.id]
      });
    }
    createClassMatchData(element) {
      return __spreadProps(__spreadValues({}, this.createPartialMatchData(element)), {
        matchType: "class",
        eventId: this.classMap[element.className]
      });
    }
    addIdMatches(element) {
      const id = element.id;
      if (!id || !(id in this.idMap)) return this;
      this.addIfNotExists(this.createIdMatchData(element));
      return this;
    }
    addClassMatches(element) {
      if (!element.classList || !element.classList.length) return this;
      for (const className of Array.from(element.classList)) {
        if (!(className in this.classMap)) continue;
        this.addIfNotExists(this.createClassMatchData(element));
      }
      return this;
    }
  };
  var MatchingElementsStorage_default = MatchingElementsStorage;

  // analytics_plugin/utils/findMatchingElements.ts
  function findMatchingElements(target, idMap2, classMap2, timestamp, url, sessionId2) {
    const matchingElementsStorage = new MatchingElementsStorage_default(
      idMap2,
      classMap2,
      timestamp,
      url,
      sessionId2
    );
    traverseParents(target, (el) => {
      matchingElementsStorage.addIdMatches(el).addClassMatches(el);
    });
    return matchingElementsStorage.matchesArray;
  }
  var findMatchingElements_default = findMatchingElements;

  // analytics_plugin/utils/promise.ts
  function wait(ms) {
    return __async(this, null, function* () {
      return new Promise((resolve) => setTimeout(resolve, ms));
    });
  }
  function retryUntilSuccessful(fn, delays, onFailure = null) {
    return __async(this, null, function* () {
      return new Promise((resolve) => {
        const cb = () => __async(null, null, function* () {
          for (const delay of delays) {
            try {
              const result = yield fn();
              if (result) resolve(result);
            } catch (error) {
              if (onFailure) onFailure(error);
            }
            yield wait(delay);
          }
          resolve(void 0);
        });
        cb();
      });
    });
  }

  // analytics_plugin/services/localStorage/flushEventsToServerPeriodically.ts
  function flushEventsToServerPeriodically(interval) {
    return __async(this, null, function* () {
      let retryInProgress = false;
      setInterval(() => __async(null, null, function* () {
        if (retryInProgress) return;
        const success = yield retryUntilSuccessful(
          () => {
            const events = getEventsFromLocalStorage();
            if (!events || !events.length) return Promise.resolve(false);
            return saveEventsToServer(events);
          },
          [5e3, 1e4, 15e3, 2e4, 3e4],
          (error) => {
            console.error(
              "Error occurred while persisting events, trying again...",
              error
            );
            retryInProgress = true;
          }
        );
        if (!success) return;
        retryInProgress = false;
        clearEventsFromLocalStorage();
      }), interval);
    });
  }
  var flushEventsToServerPeriodically_default = flushEventsToServerPeriodically;

  // analytics_plugin/utils/createIdMap.ts
  function createIdMap(events) {
    const idMap2 = {};
    for (const event of events) {
      for (const tag of event.tags) {
        if (!tag.startsWith("#")) continue;
        idMap2[tag.slice(1)] = event.id;
      }
    }
    return idMap2;
  }

  // analytics_plugin/utils/createClassListMap.ts
  function createClassListMap(events) {
    const classMap2 = {};
    for (const event of events) {
      for (const tag of event.tags) {
        if (!tag.startsWith(".")) continue;
        classMap2[tag.slice(1)] = event.id;
      }
    }
    return classMap2;
  }

  // analytics_plugin/index.ts
  var idMap = {};
  var classMap = {};
  var projectData = {};
  var matchesTempStorage = [];
  var sessionId = randomUUID();
  var saveMatchesToLocalStorage = debounce(() => {
    if (!matchesTempStorage.length) return;
    addEventsToLocalStorage(matchesTempStorage);
    matchesTempStorage.length = 0;
  }, 500);
  function initialize() {
    return __async(this, null, function* () {
      const apiKey = getApiKeyFromScriptTag();
      if (!apiKey) {
        console.error("API key not found in script tag");
        return;
      }
      Object.assign(projectData, yield fetchProjectData(apiKey));
      if (!(projectData == null ? void 0 : projectData.id)) {
        console.error("Project not found for the given API key");
        return;
      }
      const events = yield fetchEvents(projectData.id);
      Object.assign(idMap, createIdMap(events));
      Object.assign(classMap, createClassListMap(events));
      flushEventsToServerPeriodically_default(
        Number(projectData.updateIntervalSeconds || 60) * 1e3
      );
    });
  }
  initialize().catch((error) => {
    console.error("Initialization failed:", error);
  });
  window.addEventListener("click", (e) => {
    if (!e.target || !(e.target instanceof Element)) return;
    const matches = findMatchingElements_default(
      e.target,
      idMap,
      classMap,
      Date.now(),
      window.location.href,
      sessionId
    );
    if (!matches.length) return;
    matchesTempStorage.push(...matches);
    saveMatchesToLocalStorage();
  });
})();
