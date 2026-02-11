import { useEffect } from "react";

const useVisualizer = (analyserRef, dataArrayRef, canvasRef) => {
  useEffect(() => {
    let animationId;

    function draw() {
      animationId = requestAnimationFrame(draw);
      if (!analyserRef.current || !canvasRef.current) return;

      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
      ctx.beginPath();

      const sliceWidth = width / dataArrayRef.current.length;
      let x = 0;

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 255;
        const y = v * height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
    }

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);
};

export default useVisualizer;
