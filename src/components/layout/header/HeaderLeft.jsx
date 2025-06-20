import { ArrowLeft, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  back: ArrowLeft,
  location: MapPin,
  close: X,
};

export default function HeaderLeft({ icon, title, subtitle, className, onClick }) {
  const IconComponent = icons[icon];

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        <div
          onClick={onClick}
          className={cn(
            "relative cursor-pointer transition-all hover:opacity-80",
          )}
          >{IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        {title && <span className="text-lg font-semibold">{title}</span>}
      </div>
      {subtitle && (
        <div className="text-sm text-muted-foreground leading-tight -mt-1 ml-6">
          {subtitle}
        </div>
      )}
    </div>
  );
}
