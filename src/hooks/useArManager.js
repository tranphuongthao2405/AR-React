import { useEffect, useRef, useCallback } from "react";

const useArManager = (sceneRef) => {
  const arSystemRef = useRef(null);

  const startAR = useCallback(() => {
    if (!arSystemRef.current) return;

    arSystemRef.current.start();
  }, []);

  const stopAR = useCallback(() => {
    if (!arSystemRef.current) return;

    arSystemRef.current.stop();
  }, []);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;
    arSystemRef.current = sceneEl.systems["mindar-image-system"];

    return () => {
      stopAR();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopAR]);

  return {
    startAR,
    stopAR,
    arSystem: arSystemRef.current,
  };
};

export default useArManager;
