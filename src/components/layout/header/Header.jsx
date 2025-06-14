import { useHeader } from "@providers/header-context";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import { cn } from "@lib/utils"; // From ShadCN

export default function Header() {
  const { header } = useHeader();

  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 py-2 border-b sticky top-0 z-50 h-16 bg-background text-foreground", // theme-aware
        header.className // override if needed
      )}
    >
      <HeaderLeft {...header.left} />
      <HeaderRight icons={header.right} />
    </header>
  );
}
