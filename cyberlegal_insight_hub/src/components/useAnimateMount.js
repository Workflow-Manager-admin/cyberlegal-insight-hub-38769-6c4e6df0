import { useRef, useEffect, useState } from "react";

/**
 * Hook for applying CSS animation classes on component mount/unmount.
 * Returns animation class for parent element (uses timeouts to auto-remove exit class).
 *
 * Usage:
 *   const animateClass = useAnimateMount({ inClass: "animate-fade-in", outClass: "animate-fade-out", duration: 360 });
 *   return <div className={animateClass}>...</div>
 */
// PUBLIC_INTERFACE
export function useAnimateMount({
  inClass = "animate-fade-in",
  outClass = "animate-fade-out",
  duration = 350, // ms; time for exit
  active = true
} = {}) {
  const [animateClass, setAnimateClass] = useState(active ? inClass : "");
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    setAnimateClass(active ? inClass : "");
    return () => {
      isMounted.current = false;
      setAnimateClass(outClass);
      // Remove self from tree after duration if parent honors (for portal modals, etc)
    };
  }, [active, inClass, outClass]);
  return animateClass;
}

/**
 * Higher-order component: Animate entry/exit for modals/cards/tab panels.
 * Adds animation classes and triggers unmount after exit animation finishes.
 */
export function withAnimatedMount(
  Wrapped,
  { inClass = "animate-fade-in", outClass = "animate-fade-out", duration = 350 } = {}
) {
  return function AnimatedComponent(props) {
    const [show, setShow] = useState(true);
    const [leaving, setLeaving] = useState(false);
    useEffect(() => {
      if (!props.visible) {
        setLeaving(true);
        setTimeout(() => setShow(false), duration);
      } else {
        setShow(true);
        setLeaving(false);
      }
      // eslint-disable-next-line
    }, [props.visible]);
    if (!show) return null;
    return (
      <div className={leaving ? outClass : inClass}>
        <Wrapped {...props} />
      </div>
    );
  };
}
