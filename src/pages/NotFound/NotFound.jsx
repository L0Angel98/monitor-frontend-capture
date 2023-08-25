import { Suspense } from "react";
import styleModule from "./NotFound.module.sass";
import getLanguage from "../../utils/getLanguage";

function NotFound() {
  return (
    <div className={styleModule.backgroundNotFound}>
      <div className={styleModule.monitor}>
        <div className={styleModule.screen}>
          <span className={styleModule.topBar}></span>
          <span className={styleModule.bar1}></span>
          <span className={styleModule.bar2}></span>
          <span className={styleModule.bar3}></span>
          <span className={styleModule.bottomBar}></span>
        </div>
      </div>
      <div className={styleModule.containerNotFound}>
        <h1 className={styleModule.title}>
          <Suspense fallback={"Cargando..."}>
            {getLanguage({ file: "pageNotFound", key: "title" })}
          </Suspense>
        </h1>
        <p className={styleModule.message}>
          <Suspense fallback={"Cargando..."}>
            {getLanguage({ file: "pageNotFound", key: "subtitle" })}
          </Suspense>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
