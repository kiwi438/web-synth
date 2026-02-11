import { useState, useEffect, useRef } from "react";
import NOTES from "../constants/notes";
import Key from "../components/Key";
import useAudioContext from "../hooks/useAudioContext";
import useVisualizer from "../hooks/useVisualizer";
import styles from "./Synth.module.css";

const Synth = () => {
  const [wave, setWave] = useState("sine");
  const canvasRef = useRef(null);

  const { getAudioContext, analyserRef, dataArrayRef } = useAudioContext();

  useVisualizer(analyserRef, dataArrayRef, canvasRef);

  function playSound(frequency) {
    const audioCtx = getAudioContext();
    audioCtx.resume();

    const osc = new OscillatorNode(audioCtx, {
      type: wave,
      frequency,
    });
    const gain = new GainNode(audioCtx, {
      gain: 1,
    });
    osc.connect(gain);
    gain.connect(analyserRef.current);
    gain.connect(audioCtx.destination);
    osc.start();

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
    osc.stop(audioCtx.currentTime + 1);
  }

  return (
    <div className={styles.synth}>
      <h1>Synth</h1>
      <div className={`${styles.selectorContainer}`}>
        <label htmlFor="wave-selecrtor">Choose a wave:</label>
        <select
          value={wave}
          onChange={(e) => setWave(e.target.value)}
          className="wave-selector"
          name="wave-selector"
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <div className={styles.keys}>
        {NOTES.map((note) => (
          <Key
            key={note.name}
            name={note.name}
            isSharp={note.isSharp}
            offset={note.offset}
            onPlay={() => playSound(note.frequency)}
          />
        ))}
      </div>

      <div className="analyser">
        <canvas
          className="analyser-canvas"
          ref={canvasRef}
          width="600"
          height="200"
        ></canvas>
      </div>
    </div>
  );
};

export default Synth;
