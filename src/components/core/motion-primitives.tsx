import * as React from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated Counter
export function AnimatedCounter({
  value,
  direction = "up",
  className,
  delay = 0,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    mass: 1,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [motionValue, isInView, value, delay]);

  React.useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue]);

  return <span className={className} ref={ref} />;
}

// Animated Accordion
export function AnimatedAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <InView
            key={idx}
            variants={{
              hidden: { opacity: 0, filter: "blur(4px)" },
              visible: { opacity: 1, filter: "blur(0px)" },
            }}
            delay={idx * 0.1}
            className={cn(
              "rounded-xl border transition-colors",
              isOpen ? "border-primary/40 bg-surface-2" : "border-hairline bg-surface hover:bg-surface-2"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5 outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground pr-4 text-[15px] sm:text-base">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen ? "rotate-180 text-primary" : ""
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </InView>
        );
      })}
    </div>
  );
}

// Staggered Grid Wrapper
export function StaggeredGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
          }}
          className="h-full"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// InView Component
interface InViewProps {
  children: React.ReactNode;
  variants?: {
    hidden: any;
    visible: any;
  };
  transition?: any;
  viewOptions?: any;
  className?: string;
  delay?: number;
}

export function InView({
  children,
  variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  },
  transition = { duration: 0.35, ease: "easeOut" },
  viewOptions = { margin: "0px 0px -100px 0px", once: true },
  className,
  delay = 0,
}: InViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
