import { cn } from "~/lib/utils";

const languages = [
  { language: "Punjabi", proficieny: 5, remark: "Native" },
  { language: "English", proficieny: 4, remark: "Professional" },
  { language: "Hindi", proficieny: 4, remark: "Professional" },
];

export default function Languages() {
  const getSteps = (filled: number, total = 5) =>
    Array(filled)
      .fill(true)
      .concat(Array(total - filled).fill(false));
  return (
    <span className="grid gap-4">
      {languages.map((item) => (
        <span key={item.language}>
          <span className="flex justify-between w-full">
            <h4 className="mt-0">{item.language}</h4>
            <span>{item.remark}</span>
          </span>
          <span className="grid grid-cols-5 h-3 gap-1 sm:gap-2">
            {getSteps(item.proficieny).map((item, index) => (
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
      ))}
    </span>
  );
}
