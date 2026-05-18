import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS: {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  tag: string | null;
  image: string;
}[] = [
  {
    id: 1,
    name: "Blue Axolotl Squishy",
    category: "Accessories",
    price: 5.00,
    originalPrice: 7.50,
    tag: "Sale",
    image: "https://cdn.ezst.app/projects/66d6e755-0e17-40da-84d0-ab090df6cc9a/files/3aa5c940-f0c8-44fa-a7ef-a856f51759ef.jpg",
  },
];

const CATEGORIES = ["All", "Clothes", "Shoes", "Accessories"];

export default function Index() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const shopRef = useRef<HTMLDivElement>(null);

  const scrollToShop = () => shopRef.current?.scrollIntoView({ behavior: "smooth" });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchFav = !showFavoritesOnly || favorites.includes(p.id);
    return matchCat && matchFav;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="font-display text-2xl tracking-widest text-primary">
            ZBH Store
          </div>
          <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <button
              className={`transition-colors hover:text-primary ${!showFavoritesOnly ? "text-foreground" : ""}`}
              onClick={() => setShowFavoritesOnly(false)}
            >
              Shop
            </button>
            <button
              className={`transition-colors hover:text-primary flex items-center gap-1.5 ${showFavoritesOnly ? "text-primary" : ""}`}
              onClick={() => setShowFavoritesOnly((v) => !v)}
            >
              <Icon name="Heart" size={13} />
              Saved
              {favorites.length > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
          <button
            className="relative flex items-center gap-2 text-xs tracking-widest uppercase text-foreground hover:text-primary transition-colors"
            onClick={() => setCartCount((c) => c + 1)}
          >
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-border">
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 animate-fade-up stagger-1">
              New Collection — SS 2026
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-none text-foreground animate-fade-up stagger-2">
              ZBH Fans<br />
              <span className="italic text-primary">Shop Here</span>
            </h1>
          </div>
          <div className="animate-fade-up stagger-3 flex flex-col gap-6 md:ml-auto max-w-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curated pieces for those who understand that true style is quiet,
              structured, and enduring.
            </p>
            <button
              onClick={scrollToShop}
              className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-yellow-400 transition-colors w-fit"
            >
              Shop Here
              <Icon name="ArrowDown" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowFavoritesOnly(false); }}
              className={`px-4 py-1.5 text-xs tracking-[0.15em] uppercase transition-all border ${
                activeCategory === cat && !showFavoritesOnly
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFavoritesOnly((v) => !v)}
          className={`flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-all border px-4 py-1.5 ${
            showFavoritesOnly
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          <Icon name="Heart" size={12} />
          Saved ({favorites.length})
        </button>
      </div>

      {/* GRID */}
      <main ref={shopRef} className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <Icon name="Heart" size={40} className="text-border mx-auto mb-4" />
            <p className="font-display text-3xl text-muted-foreground italic">No saved items yet</p>
            <p className="text-xs tracking-widest text-muted-foreground mt-2 uppercase">
              Tap the heart on any product to save it
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
                onAddToCart={() => setCartCount((c) => c + 1)}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="font-display text-3xl tracking-widest text-primary mb-2">ZBH Store</div>
            <p className="text-xs text-muted-foreground tracking-wide">Clothes · Shoes · Accessories</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">About</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Shipping</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Returns</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  tag: string | null;
  image: string;
};

function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  index,
}: {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  return (
    <div
      className={`bg-card group relative cursor-pointer animate-fade-up ${staggerClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
        />
        {product.tag && (
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase px-2 py-1 font-medium">
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-all ${
            isFavorite ? "text-primary" : "text-foreground/50 hover:text-primary"
          }`}
        >
          <Icon
            name="Heart"
            size={18}
            className={isFavorite ? "fill-primary text-primary" : ""}
          />
        </button>
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="w-full bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase py-3 font-medium hover:bg-yellow-400 transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-border bg-card">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <div className="flex items-end justify-between">
          <h3 className="font-display text-lg font-light text-foreground leading-tight">
            {product.name}
          </h3>
          <div className="flex flex-col items-end gap-0.5">
            {product.originalPrice && (
              <span className="text-muted-foreground text-xs line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-primary font-medium text-sm tracking-wide">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}