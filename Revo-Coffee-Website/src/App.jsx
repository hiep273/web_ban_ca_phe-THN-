import { useMemo, useState } from "react";

const navItems = ["home", "coffee", "color filter", "combos", "giftset", "contact"];

const features = [
  ["icon1.svg", "Lorem, ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit."],
  ["icon2.svg", "Lorem, ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit."],
  ["icon3.svg", "Lorem, ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit."],
  ["icon4.svg", "Lorem, ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit."],
];

const coffees = [
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
].map((image, index) => ({
  id: `${image}-${index}`,
  image: `/assets/img/section2/${image}`,
  price: "99.000$",
  name: "REVO Morning",
  desc: "Bitter, sweet aftertaste, floral scent.",
}));

const giftsets = [
  {
    price: "285.000$",
    image: "/assets/img/section3/giftset1Img.png",
    name: 'Giftset "Vietnamese Filtered Coffee"',
    desc: "The perfect gift for coffee lovers. The coffee beans are carefully selected by Revo, roasted and ground according to technology and know-how derived from renowned artisans and with the love and passion of coffee makers... creating pure cups of coffee exclusively for you.",
    nutType: "Fine Robusta Blend",
    height: "700 - 800m",
  },
  {
    price: "319.000$",
    image: "/assets/img/section3/giftset2Img.png",
    name: 'Giftset "Lovely Day"',
    desc: "The perfect gift for lovers. The coffee beans are carefully selected by Revo, roasted and ground according to technology and know-how derived from renowned artisans and with the love and passion of coffee makers... creating pure cups of coffee exclusively for you.",
    nutType: "Cacao beans",
    height: "900 - 1000m",
  },
  {
    price: "190.000$",
    image: "/assets/img/section3/giftset3Img.png",
    name: 'Giftset "Natural Culture Drink"',
    desc: "The perfect gift for coffee lovers. The beans are carefully selected by Revo, roasted and ground according to technology and know-how derived from renowned artisans and with the love and passion of coffee makers... creating pure cups of coffee exclusively for you.",
    nutType: "Natural Coffee Beans",
    height: "300 - 400m",
  },
];

const combos = [
  {
    image: "/assets/img/section4/combo1.png",
    price: "147.000$",
    oldPrice: "155.000$",
    name: "Bold Revo Combo",
    desc: "The caffeine content in Revo Bold is strong enough to keep you awake at work...",
  },
  {
    image: "/assets/img/section4/combo2.png",
    price: "156.000$",
    oldPrice: "165.000$",
    name: "Combo Revo Everyday",
    desc: "Revo Everyday is a blend of the bitter flavor of Robusta beans and the aroma...",
  },
  {
    image: "/assets/img/section4/combo3.png",
    price: "275.000$",
    oldPrice: "260.000$",
    name: "Combo Revo Honey",
    desc: 'Honey - the name "Revo Honey" comes from the method of processing arabica grains...',
  },
];

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="text-center">
      <p className="text-base font-semibold md:text-lg">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function ProductActions({ onBuy, accent = "accent" }) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button className={`btn ${accent === "danger" ? "bg-danger" : "bg-accent"} text-paper`} onClick={onBuy}>
        Buy now
      </button>
      <button className="btn text-ink">Details</button>
    </div>
  );
}

function Header({ cartCount }) {
  const [activeNav, setActiveNav] = useState("home");

  return (
    <header className="relative min-h-[620px] overflow-hidden border-b border-ink/40 bg-paper lg:min-h-[800px]">
      <div className="mx-auto flex min-h-[620px] max-w-[1640px] justify-between lg:min-h-[800px]">
        <div className="animate-left z-20 flex w-[42%] flex-col justify-between px-6 py-10 md:px-12 lg:px-20">
          <img className="h-auto w-32 lg:w-44" src="/assets/img/header/logo.svg" alt="Revo Coffee" />
          <h1 className="mb-14 text-left font-montserrat text-5xl uppercase leading-tight text-primary md:text-6xl lg:text-7xl">
            <span className="block">your</span>
            <span className="my-2 inline-block bg-accent px-3 py-2 text-paper">personalized</span>
            <span className="block">coffee</span>
          </h1>
        </div>

        <div className="animate-right absolute inset-y-0 right-0 flex w-[68%] justify-end">
          <img className="hidden h-full w-[68%] object-cover md:block" src="/assets/img/header/header-half-bg.png" alt="" />
          <nav className="flex h-full w-full max-w-[320px] bg-primary px-10 py-20 md:w-[32%] md:min-w-[260px]">
            <div className="flex h-full flex-col justify-between">
              <div className="relative w-8">
                <img className="h-7 w-7" src="/assets/img/header/cart-icon.svg" alt="Cart" />
                {cartCount > 0 && (
                  <span className="absolute -right-5 -top-4 rounded-full bg-accent px-2.5 py-0.5 text-sm font-light text-paper">
                    {cartCount}
                  </span>
                )}
              </div>
              <ul className="space-y-7 text-left">
                {navItems.map((item) => (
                  <li key={item} className="text-left">
                    <button
                      className={`text-left text-lg uppercase text-mist transition hover:font-bold lg:text-2xl ${
                        activeNav === item ? "font-bold" : "font-light"
                      }`}
                      onMouseEnter={() => setActiveNav(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className="animate-right px-6 py-20">
      <SectionTitle eyebrow="Your Personalized Coffee" title="COFFEE BUILD YOUR BASE" />
      <ul className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-4">
        {features.map(([icon, title, desc]) => (
          <li key={icon} className="flex flex-col items-center text-center">
            <img className="h-20 w-20 object-contain" src={`/assets/img/section1/${icon}`} alt="" />
            <h3 className="mt-8 text-xl font-bold text-primary">{title}</h3>
            <p className="mt-2 max-w-56 font-light leading-6 text-primary">{desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CoffeeSlider({ onBuy }) {
  const [page, setPage] = useState(0);
  const maxPage = 2;

  return (
    <section className="animate-left relative overflow-hidden py-24">
      <SectionTitle eyebrow="Choose Your Favorite" title="STANDART GUARANTEE" />
      <div className="relative mt-16 overflow-hidden">
        {page > 0 && <span className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/4 bg-gradient-to-l from-transparent to-paper" />}
        {page < maxPage && <span className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/4 bg-gradient-to-r from-transparent to-paper" />}

        <button
          className={`slider-arrow left-6 rotate-180 ${page === 0 ? "pointer-events-none opacity-0" : "opacity-100"}`}
          onClick={() => setPage((value) => Math.max(0, value - 1))}
          aria-label="Previous coffees"
        >
          <img src="/assets/img/section2/arrow.svg" alt="" />
        </button>
        <button
          className={`slider-arrow right-6 ${page === maxPage ? "pointer-events-none opacity-0" : "opacity-100"}`}
          onClick={() => setPage((value) => Math.min(maxPage, value + 1))}
          aria-label="Next coffees"
        >
          <img src="/assets/img/section2/arrow.svg" alt="" />
        </button>

        <div className="slider-stage">
          <ul className="grid w-[1900px] grid-cols-5 gap-8 transition-transform duration-700 md:grid-cols-5" style={{ transform: `translateX(-${page * 520}px)` }}>
            {coffees.map((coffee) => (
              <li className="flex w-[500px] bg-paper shadow-soft" key={coffee.id}>
                <img className="h-56 w-56 bg-mist object-contain" src={coffee.image} alt={coffee.name} />
                <div className="flex flex-1 flex-col justify-center px-8 py-6 text-left">
                  <p className="price">{coffee.price}</p>
                  <h3 className="product-name mt-2">{coffee.name}</h3>
                  <p className="mt-4 font-light text-ink">{coffee.desc}</p>
                  <ProductActions onBuy={onBuy} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function GiftsetSection({ onBuy }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const giftset = giftsets[selectedIndex];

  return (
    <section className="animate-right bg-[linear-gradient(90deg,#edf0f5_69%,#f9fbff_69%)] px-6 py-24">
      <SectionTitle eyebrow="Best Gift For a Best Friend" title="GIFTSET" />
      <div className="mx-auto mt-16 max-w-5xl pl-0 md:pl-48">
        <div className="flex bg-paper shadow-soft">
          <img className="-ml-48 hidden h-[500px] object-contain md:block" src={giftset.image} alt={giftset.name} />
          <div className="grid flex-1 grid-cols-[1fr_88px]">
            <div className="p-8 text-left md:p-14">
              <p className="price">{giftset.price}</p>
              <h3 className="product-name mt-4">{giftset.name}</h3>
              <p className="mt-5 font-light leading-7 text-ink">{giftset.desc}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <Spec icon="/assets/img/section3/coffeeBeansIcon.svg" label="Nut type" value={giftset.nutType} />
                <Spec icon="/assets/img/section3/mountainIcon.svg" label="Height" value={giftset.height} />
              </div>
              <ProductActions onBuy={onBuy} />
            </div>
            <div className="grid">
              {giftsets.map((item, index) => (
                <button
                  className={`font-montserrat text-3xl transition ${selectedIndex === index ? "bg-paper text-primary" : "bg-mist/80 text-primary/50 shadow-inner"}`}
                  key={item.name}
                  onClick={() => setSelectedIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 text-left">
      <img className="h-11 w-11 object-contain" src={icon} alt="" />
      <div>
        <p className="font-light text-primary">{label}</p>
        <p className="font-semibold text-primary">{value}</p>
      </div>
    </div>
  );
}

function ComboSection({ onBuy }) {
  return (
    <section className="animate-right bg-[linear-gradient(90deg,#f9fbff_75%,#415167_75%)] px-6 py-24">
      <SectionTitle eyebrow="Your Personalized Coffee" title="COFFEE COMBOS" />
      <ul className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
        {combos.map((combo) => (
          <li className="bg-paper shadow-soft" key={combo.name}>
            <img className="w-full bg-mist object-contain" src={combo.image} alt={combo.name} />
            <div className="p-8 text-left">
              <div className="flex max-w-40 items-center justify-between gap-3">
                <p className="price">{combo.price}</p>
                <p className="text-sm font-light text-primary line-through">{combo.oldPrice}</p>
              </div>
              <h3 className="product-name mt-4">{combo.name}</h3>
              <p className="mt-4 font-light leading-6 text-ink">{combo.desc}</p>
              <ProductActions onBuy={onBuy} accent="danger" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = useMemo(() => () => setCartCount((count) => count + 1), []);

  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        <FeatureSection />
        <CoffeeSlider onBuy={addToCart} />
        <GiftsetSection onBuy={addToCart} />
        <ComboSection onBuy={addToCart} />
      </main>
      <footer className="bg-mist py-5 text-center">
        <p className="m-0 font-light italic text-primary">© Revo Coffee Viet Nam - 2018</p>
      </footer>
    </>
  );
}
