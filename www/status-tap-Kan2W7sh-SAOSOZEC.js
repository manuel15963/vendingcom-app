import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-BO3M4MYW.js";
import {
  componentOnReady
} from "./chunk-QI4RD4AE.js";
import {
  readTask,
  writeTask
} from "./chunk-GFYVZQ5H.js";
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/core/dist/esm/status-tap-Kan2W7sh.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(() => __async(null, null, function* () {
            contentEl.style.setProperty("--overflow", "hidden");
            yield scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          }));
        });
      }
    });
  });
};
export {
  startStatusTap
};
/*! Bundled license information:

@ionic/core/dist/esm/status-tap-Kan2W7sh.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=status-tap-Kan2W7sh-SAOSOZEC.js.map
