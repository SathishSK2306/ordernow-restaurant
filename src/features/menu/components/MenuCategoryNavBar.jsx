// src/features/menu/components/MenuCategoryNavBar.jsx
import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import MenuOverviewDrawer from './MenuOverviewDrawer';

const MenuCategoryNavBar = ({ categories, onSelect }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const containerRef = useRef(null);
  const buttonRefs = useRef({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCategoryClick = (id) => {
    const el = document.getElementById(`category-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryMenuClick = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.getAttribute('id')?.replace('category-', '');
          setActiveCategoryId(id);
          onSelect?.(id);

          const button = buttonRefs.current[id];
          if (button && containerRef.current) {
            const buttonLeft = button.offsetLeft;
            const buttonRight = buttonLeft + button.offsetWidth;
            const containerScrollLeft = containerRef.current.scrollLeft;
            const containerWidth = containerRef.current.offsetWidth;

            if (buttonLeft < containerScrollLeft || buttonRight > containerScrollLeft + containerWidth) {
              containerRef.current.scrollTo({
                left: buttonLeft - containerRef.current.offsetWidth / 2 + button.offsetWidth / 2,
                top: 0,
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
              });
            }
          }
        }
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll('[id^="category-"]');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [onSelect]);

  return (
    <>
    <div className="sticky top-[62px] z-30 bg-white border-b py-3">
      <div
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
        ref={containerRef}
      >
        <button className="shrink-0 p-2 text-gray-500" onClick={()=> handleCategoryMenuClick()}>
          <Menu className="w-5 h-5" />
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            ref={(el) => (buttonRefs.current[cat.id] = el)}
            onClick={() => handleCategoryClick(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              activeCategoryId === String(cat.id)
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
     {/* Drawer Component */}
      <MenuOverviewDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={categories}
        onSelect={(id) => {
          handleCategoryClick(id);
          setIsDrawerOpen(false);
        }}
      />
    </>
  );
};

export default MenuCategoryNavBar;
