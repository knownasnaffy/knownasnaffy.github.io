import { cn } from "~/lib/utils";

export default function Languages() {
  const getSteps = (filled: number, total = 5) =>
    Array(filled)
      .fill(true)
      .concat(Array(total - filled).fill(false));
  return (
    <>
      <span className="grid gap-4">
        <span>
          <span className="flex justify-between w-full">
            <h4 className="mt-0">Punjabi</h4>
            <span>Native</span>
          </span>
          <span className="grid grid-cols-5 h-3 gap-2">
            {getSteps(5).map((item, index) => (
              <span
                className={cn(
                  item ? "bg-[#D1D5DC]" : "bg-muted",
                  "rounded-xs",
                  index === 0 && "rounded-l-sm",
                  index === 4 && "rounded-r-sm"
                )}
              ></span>
            ))}
          </span>
        </span>
        <span>
          <span className="flex justify-between w-full">
            <h4 className="mt-0">English</h4>
            <span>Professional</span>
          </span>
          <span className="grid grid-cols-5 h-3 gap-2">
            {getSteps(4).map((item, index) => (
              <span
                className={cn(
                  item ? "bg-[#D1D5DC]" : "bg-muted",
                  "rounded-xs",
                  index === 0 && "rounded-l-sm",
                  index === 4 && "rounded-r-sm"
                )}
              ></span>
            ))}
          </span>
        </span>
        <span>
          <span className="flex justify-between w-full">
            <h4 className="mt-0">Hindi</h4>
            <span>Professional</span>
          </span>
          <span className="grid grid-cols-5 h-3 gap-2">
            {getSteps(4).map((item, index) => (
              <span
                className={cn(
                  item ? "bg-[#D1D5DC]" : "bg-muted",
                  "rounded-xs",
                  index === 0 && "rounded-l-sm",
                  index === 4 && "rounded-r-sm"
                )}
              ></span>
            ))}
          </span>
        </span>
      </span>
    </>
  );
}
