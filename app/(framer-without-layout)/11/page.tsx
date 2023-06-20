"use client";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { createContext } from "react";
import { useContext } from "react";
import useMeasure from "react-use-measure";

let transition = { type: "ease", ease: "easeInOut", duration: 1 };

export default function ResizablePanel() {
  let [status, setStatus] = useState("idle");
  const [ref, bounds] = useMeasure();

  return (
    <MotionConfig transition={{ duration: 0.3 }}>
      <div className="flex min-h-screen flex-col items-start bg-zinc-900 pt-28">
        <div className="mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800">
            <div className="px-8 pt-8">
              <p className="text-lg text-white">Reset password</p>
            </div>

            <motion.div
              animate={{
                height: bounds.height > 0 ? bounds.height : undefined,
              }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            >
              <div ref={ref}>
                <AnimatePresence mode="popLayout">
                  {status === "idle" || status === "saving" ? (
                    <motion.div exit={{ opacity: 0 }} key={"x"}>
                      <FormProvider
                        onSubmit={async () => await delay(1000)}
                        afterSave={() => setStatus("success")}
                        // @ts-ignore
                        className="p-8"
                      >
                        <p className="text-sm text-zinc-400">
                          Enter your email to get a password reset link:
                        </p>
                        <div className="mt-3">
                          <input
                            className="block w-full rounded-sm border-none px-3 py-2 text-slate-900"
                            type="email"
                            required
                            defaultValue="sam@buildui.com"
                          />
                        </div>
                        <div className="mt-8 text-right">
                          <FormProvider.Button className="rounded bg-indigo-500 px-5 py-2 text-sm font-medium text-white ">
                            Email me my link
                          </FormProvider.Button>
                        </div>
                      </FormProvider>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="p-8 text-sm text-zinc-400">
                        Email sent! Check your inbox to continue.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            <span className="underline">Reach out</span> to us if you need more
            help.
          </p>
        </div>
      </div>
    </MotionConfig>
  );
}

let formContext = createContext<{
  status: "idle" | "saving" | "success";
  setStatus: Dispatch<SetStateAction<"idle" | "saving" | "success">>;
} | null>(null);

function FormProvider({
  onSubmit,
  afterSave,
  children,
  ...props
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  afterSave: () => void;
  children: React.ReactNode;
  props: { [key: string]: any };
}) {
  let [status, setStatus] = useState<"saving" | "success" | "idle">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    await onSubmit(e);
    setStatus("success");
    await delay(1250);
    afterSave();
  }

  const value = {
    status,
    setStatus,
  };

  return (
    <formContext.Provider value={value}>
      <form onSubmit={handleSubmit} {...props}>
        <fieldset disabled={status !== "idle"}>{children}</fieldset>
      </form>
    </formContext.Provider>
  );
}

FormProvider.Button = function FormButton({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
}) {
  let { status } = useContext(formContext)!;

  let disabled = status !== "idle";

  return (
    <MotionConfig transition={{ ...transition, duration: 0.15 }}>
      <button
        type="submit"
        disabled={disabled}
        className={`${className} relative transition duration-200 ${
          disabled ? "bg-opacity-80" : "hover:bg-opacity-80"
        }`}
        {...rest}
      >
        <AnimatePresence mode="wait">
          {status === "saving" && (
            <motion.div
              key="a"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex justify-center py-2"
            >
              <Spinner />
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="b"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex justify-center py-2"
            >
              <AiOutlineCheck className="h-full" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className={status === "idle" ? "" : "invisible"}>{children}</span>
      </button>
    </MotionConfig>
  );
};

function Spinner({ className, ...rest }: { className?: any }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} h-full w-auto animate-spin`}
      style={{
        animationTimingFunction: "steps(8, end)",
        animationDuration: ".75s",
      }}
      {...rest}
    >
      <rect
        style={{ opacity: 0.4 }}
        x={11}
        y={2}
        width={2}
        height={6}
        rx={1}
        fill="currentColor"
      />
      <rect
        style={{ opacity: 0.4 }}
        x={18.364}
        y={4.22183}
        width={2}
        height={6}
        rx={1}
        transform="rotate(45 18.364 4.222)"
        fill="currentColor"
      />
      <rect
        x={22}
        y={11}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(90 22 11)"
        fill="currentColor"
      />
      <rect
        x={19.7782}
        y={18.364}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(135 19.778 18.364)"
        fill="currentColor"
      />
      <rect
        x={13}
        y={22}
        width={2}
        style={{ opacity: 0.4 }}
        height={6}
        rx={1}
        transform="rotate(-180 13 22)"
        fill="currentColor"
      />
      <rect
        x={5.63603}
        y={19.7782}
        width={2}
        style={{ opacity: 0.6 }}
        height={6}
        rx={1}
        transform="rotate(-135 5.636 19.778)"
        fill="currentColor"
      />
      <rect
        x={2}
        y={13}
        width={2}
        style={{ opacity: 0.8 }}
        height={6}
        rx={1}
        transform="rotate(-90 2 13)"
        fill="currentColor"
      />
      <rect
        x={4.22183}
        y={5.63603}
        width={2}
        height={6}
        rx={1}
        transform="rotate(-45 4.222 5.636)"
        fill="currentColor"
      />
    </svg>
  );
}

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
