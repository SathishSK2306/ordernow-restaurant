import { Bell, ShoppingCart, Search, Heart, User, MoreHorizontal } from "lucide-react";
import HeaderIconButton from "./HeaderIconButton";

const iconMap = {
  bell: Bell,
  cart: ShoppingCart,
  search: Search,
  heart: Heart,
  account: User,
  options: MoreHorizontal,
};

export default function HeaderRight({ icons = [] }) {
  return (
    <div className="flex items-center gap-4">
      {icons.map(({ icon, count, onClick, className }, idx) => {
        const Icon = iconMap[icon];
        return (
          <HeaderIconButton
            key={idx}
            Icon={Icon}
            count={count}
            onClick={onClick}
            className={className}
          />
        );
      })}
    </div>
  );
}
