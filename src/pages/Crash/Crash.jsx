import styleModule from "./Crash.module.sass";

function Crash() {
  return (
    <div className={styleModule.backgroundCrash}>
      <div className={styleModule.monitor}>
        <div className={styleModule.screen}>
          <span className={styleModule.bar1}></span>
          <span className={styleModule.bar2}></span>
          <span className={styleModule.bar3}></span>
        </div>
      </div>
      <div className={styleModule.containerNotFound}>
        <h1 className={styleModule.title}>Try again.</h1>
        <p className={styleModule.message}>Sorry, something went wrong!</p>
      </div>
    </div>
  );
}

export default Crash;
