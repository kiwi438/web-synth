import styles from "./Key.module.css";

const Key = ({ name, isSharp, onPlay, offset }) => {
  const sharpStyle = isSharp
    ? { left: `calc(${offset} * var(--white-width) - var(--sharp-offset))` }
    : {};

  return (
    <button
      className={`${styles.key} ${isSharp ? styles.sharp : styles.white}`}
      style={sharpStyle}
      onClick={onPlay}
    >
      {name}
    </button>
  );
};

export default Key;
