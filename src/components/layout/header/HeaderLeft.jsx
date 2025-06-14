import { ArrowLeft, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  back: ArrowLeft,
  location: MapPin,
};

export default function HeaderLeft({ icon, title, subtitle, className }) {
  const IconComponent = icon ? icons[icon] : null;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        {IconComponent && <IconComponent className="w-5 h-5" />}
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
