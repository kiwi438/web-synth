import { useRef } from "react";

const useAudioContext = () => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  function getAudioContext() {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = new AnalyserNode(audioContextRef.current, {
        fftSize: 2048,
      });
      dataArrayRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
    }

    return audioContextRef.current;
  }

  return {
    getAudioContext,
    analyserRef,
    dataArrayRef,
  };
};

export default useAudioContext;
