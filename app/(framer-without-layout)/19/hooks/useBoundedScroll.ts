import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import clamp from "../utils/clamp";

export default function useBoundedScroll(bounds: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    const diff = latest - previous;

    const newHeight = clamp(scrollYBounded.get() + diff, 0, bounds);

    scrollYBounded.set(newHeight);
  });

  return { scrollYBounded, scrollYBoundedProgress };
}
