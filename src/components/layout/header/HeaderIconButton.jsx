import { cn } from "@/lib/utils";

export default function HeaderIconButton({ Icon, count, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all hover:opacity-80",
        className
      )}
    >
      <Icon className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1 leading-none">
          {count}
        </span>
      )}
    </div>
  );
}