function ModeSelector({
  mode,
  setMode
}) {
  return (
    <div className="mode-wrapper">

      <div className="mode-selector">

        <button
          className={
            mode === "exam"
              ? "mode-btn active-mode"
              : "mode-btn"
          }
          onClick={() => setMode("exam")}
        >
          Exam Mode
        </button>

        <button
          className={
            mode === "depth"
              ? "mode-btn active-mode"
              : "mode-btn"
          }
          onClick={() => setMode("depth")}
        >
          Depth Mode
        </button>

      </div>

    </div>
  );
}

export default ModeSelector;