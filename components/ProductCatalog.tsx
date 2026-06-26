"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Settings2, Wrench } from "lucide-react";
import { WhatsAppIcon } from "./icons";

type SpacerProduct = {
  id: string;
  category: "spacer";
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  name: string;
  thickness: string;
  pcd: string;
  hubBore: string;
  boltSize: string;
  price: string;
};

type CoiloverProduct = {
  id: string;
  category: "coilover";
  name: string;
  adjustableHeight: string;
  dampingLevels: string;
  springRate: string;
  warranty: string;
  price: string;
  tag: string;
};

type Product = SpacerProduct | CoiloverProduct;

const PRODUCTS: Product[] = [
  {
    id: "bmw-f30-12mm",
    category: "spacer",
    make: "BMW",
    model: "F30",
    yearStart: 2012,
    yearEnd: 2015,
    name: "BMW F30 12mm spacer",
    thickness: "12mm",
    pcd: "5×120",
    hubBore: "72.6mm",
    boltSize: "M12×1.5",
    price: "₼85",
  },
  {
    id: "bmw-f30-15mm",
    category: "spacer",
    make: "BMW",
    model: "F30",
    yearStart: 2016,
    yearEnd: 2019,
    name: "BMW F30 15mm spacer",
    thickness: "15mm",
    pcd: "5×120",
    hubBore: "72.6mm",
    boltSize: "M12×1.5",
    price: "₼95",
  },
  {
    id: "bmw-f10-20mm",
    category: "spacer",
    make: "BMW",
    model: "F10",
    yearStart: 2010,
    yearEnd: 2017,
    name: "BMW F10 20mm spacer",
    thickness: "20mm",
    pcd: "5×120",
    hubBore: "72.6mm",
    boltSize: "M12×1.5",
    price: "₼110",
  },
  {
    id: "bmw-g30-15mm",
    category: "spacer",
    make: "BMW",
    model: "G30",
    yearStart: 2017,
    yearEnd: 2025,
    name: "BMW G30 15mm spacer",
    thickness: "15mm",
    pcd: "5×120",
    hubBore: "72.6mm",
    boltSize: "M12×1.5",
    price: "₼95",
  },
  {
    id: "merc-w212-12mm",
    category: "spacer",
    make: "Mercedes-Benz",
    model: "W212",
    yearStart: 2009,
    yearEnd: 2013,
    name: "Mercedes W212 12mm spacer",
    thickness: "12mm",
    pcd: "5×112",
    hubBore: "66.6mm",
    boltSize: "M12×1.5",
    price: "₼85",
  },
  {
    id: "merc-w212-15mm",
    category: "spacer",
    make: "Mercedes-Benz",
    model: "W212",
    yearStart: 2014,
    yearEnd: 2016,
    name: "Mercedes W212 15mm spacer",
    thickness: "15mm",
    pcd: "5×112",
    hubBore: "66.6mm",
    boltSize: "M12×1.5",
    price: "₼95",
  },
  {
    id: "merc-w213-20mm",
    category: "spacer",
    make: "Mercedes-Benz",
    model: "W213",
    yearStart: 2016,
    yearEnd: 2025,
    name: "Mercedes W213 20mm spacer",
    thickness: "20mm",
    pcd: "5×112",
    hubBore: "66.6mm",
    boltSize: "M12×1.5",
    price: "₼110",
  },
  {
    id: "toyota-prado-30mm",
    category: "spacer",
    make: "Toyota",
    model: "Prado 150",
    yearStart: 2010,
    yearEnd: 2024,
    name: "Toyota Prado 150 30mm spacer",
    thickness: "30mm",
    pcd: "6×139.7",
    hubBore: "106.1mm",
    boltSize: "M12×1.5",
    price: "₼140",
  },
  {
    id: "toyota-prius-15mm",
    category: "spacer",
    make: "Toyota",
    model: "Prius 30",
    yearStart: 2009,
    yearEnd: 2015,
    name: "Toyota Prius 30 15mm spacer",
    thickness: "15mm",
    pcd: "5×114.3",
    hubBore: "60.1mm",
    boltSize: "M12×1.5",
    price: "₼90",
  },
  {
    id: "coilover-sport",
    category: "coilover",
    name: "Sport Coilover Dəsti",
    adjustableHeight: "±40mm",
    dampingLevels: "16 mərhələ",
    springRate: "8K / 6K",
    warranty: "2 il",
    price: "₼580",
    tag: "Ən Çox Satılan",
  },
  {
    id: "coilover-premium",
    category: "coilover",
    name: "Premium Track Coilover Dəsti",
    adjustableHeight: "±60mm",
    dampingLevels: "32 mərhələ",
    springRate: "10K / 8K",
    warranty: "3 il",
    price: "₼950",
    tag: "Premium",
  },
];

function getMakes(): string[] {
  return [...new Set(PRODUCTS.filter((p) => p.category === "spacer").map((p) => (p as SpacerProduct).make))];
}

function getModels(make: string): string[] {
  return [
    ...new Set(
      PRODUCTS.filter((p) => p.category === "spacer" && (p as SpacerProduct).make === make).map(
        (p) => (p as SpacerProduct).model
      )
    ),
  ];
}

function getYears(make: string, model: string): string[] {
  const years = new Set<number>();
  PRODUCTS.filter(
    (p) =>
      p.category === "spacer" &&
      (p as SpacerProduct).make === make &&
      (p as SpacerProduct).model === model
  ).forEach((p) => {
    const sp = p as SpacerProduct;
    for (let y = sp.yearStart; y <= sp.yearEnd; y++) years.add(y);
  });
  return [...years].sort((a, b) => a - b).map(String);
}

function buildWhatsAppUrl(product: Product, make?: string, model?: string, year?: string): string {
  const base = "https://wa.me/994515411147?text=";
  const msg =
    make && model && year
      ? `Salam! ${make} ${model} ${year} avtomobilim üçün ${product.name} sifariş etmək istəyirəm.`
      : `Salam! ${product.name} sifariş etmək istəyirəm.`;
  return base + encodeURIComponent(msg);
}

function SpacerCard({
  product,
  make,
  model,
  year,
}: Readonly<{ product: SpacerProduct; make?: string; model?: string; year?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="relative bg-white border border-zinc-200/80 shadow-sm rounded-xl overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
    >
      <div className="h-0.5 bg-linear-to-r from-brand-blue to-brand-red" />

      <div className="p-3 flex flex-col flex-1 gap-2">
        {/* Badge + icon row */}
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-[9px] uppercase tracking-widest text-white bg-zinc-900 rounded-sm px-2 py-0.5">
            Spacer
          </span>
          <Shield size={14} className="text-zinc-400" />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-zinc-900 text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Main feature */}
        <span className="font-heading font-extrabold text-xl text-brand-red leading-none">
          {product.thickness}
        </span>

        {/* Key specs */}
        <div className="text-[10px] text-zinc-500 leading-tight space-y-0.5">
          <p>PCD: {product.pcd}</p>
          <p>Hub: {product.hubBore}</p>
        </div>

        {/* Price + button */}
        <div className="mt-auto pt-2 border-t border-zinc-100 flex flex-col gap-1.5">
          <span className="font-heading font-black text-base text-zinc-900">
            {product.price}
          </span>
          <a
            href={buildWhatsAppUrl(product, make, model, year)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-semibold text-[11px] py-2 rounded-lg w-full transition-all duration-200"
          >
            <WhatsAppIcon size={11} />
            Sifariş Et
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function CoiloverCard({ product }: Readonly<{ product: CoiloverProduct }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="relative bg-white border border-zinc-200/80 shadow-sm rounded-xl overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
    >
      <div className="h-0.5 bg-linear-to-r from-brand-red to-brand-blue" />

      <div className="p-3 flex flex-col flex-1 gap-2">
        {/* Badge + icon row */}
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-[9px] uppercase tracking-widest text-white bg-zinc-900 rounded-sm px-2 py-0.5">
            Coilover
          </span>
          <Settings2 size={14} className="text-zinc-400" />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-zinc-900 text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Main feature */}
        <span className="font-heading font-extrabold text-xl text-brand-red leading-none">
          {product.adjustableHeight}
        </span>

        {/* Key specs */}
        <div className="text-[10px] text-zinc-500 leading-tight space-y-0.5">
          <p>Söndürücü: {product.dampingLevels}</p>
          <p>Zəmanət: {product.warranty}</p>
        </div>

        {/* Price + button */}
        <div className="mt-auto pt-2 border-t border-zinc-100 flex flex-col gap-1.5">
          <span className="font-heading font-black text-base text-zinc-900">
            {product.price}
          </span>
          <a
            href={buildWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-semibold text-[11px] py-2 rounded-lg w-full transition-all duration-200"
          >
            <WhatsAppIcon size={11} />
            Sifariş Et
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  disabled,
  onChange,
}: Readonly<{
  label: string;
  value: string;
  options: string[];
  disabled: boolean;
  onChange: (v: string) => void;
}>) {
  return (
    <div className="relative flex-1 min-w-[140px]">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none font-body text-sm font-medium rounded-xl px-4 py-3 pr-10 border transition-all duration-200 outline-none
          ${disabled
            ? "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"
            : "bg-white border-zinc-300 text-zinc-900 cursor-pointer hover:border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
          }`}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? "text-zinc-300" : "text-zinc-500"
          }`}
      />
    </div>
  );
}

export default function ProductCatalog() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const makes = useMemo(() => getMakes(), []);
  const models = useMemo(() => (selectedMake ? getModels(selectedMake) : []), [selectedMake]);
  const years = useMemo(
    () => (selectedMake && selectedModel ? getYears(selectedMake, selectedModel) : []),
    [selectedMake, selectedModel]
  );

  const handleMakeChange = (v: string) => {
    setSelectedMake(v);
    setSelectedModel("");
    setSelectedYear("");
  };

  const handleModelChange = (v: string) => {
    setSelectedModel(v);
    setSelectedYear("");
  };

  const isFiltered = Boolean(selectedMake && selectedModel && selectedYear);

  const displayedProducts = useMemo<Product[]>(() => {
    if (!isFiltered) return PRODUCTS;
    const yearNum = parseInt(selectedYear, 10);
    return PRODUCTS.filter((p) => {
      if (p.category === "coilover") return false;
      const sp = p as SpacerProduct;
      return (
        sp.make === selectedMake &&
        sp.model === selectedModel &&
        yearNum >= sp.yearStart &&
        yearNum <= sp.yearEnd
      );
    });
  }, [isFiltered, selectedMake, selectedModel, selectedYear]);

  return (
    <section className="py-24 px-4 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-5xl text-zinc-900 mt-4"
          >
            Məhsullarımız
          </motion.h2>

        </div>

        {/* 3-Tier Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wrench size={16} className="text-brand-red" />
            <p className="font-body text-sm font-semibold text-zinc-700 uppercase tracking-widest">
              Avtomobilinizi Seçin
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <FilterSelect
              label="Marka Seçin"
              value={selectedMake}
              options={makes}
              disabled={false}
              onChange={handleMakeChange}
            />
            <FilterSelect
              label="Model Seçin"
              value={selectedModel}
              options={models}
              disabled={!selectedMake}
              onChange={handleModelChange}
            />
            <FilterSelect
              label="İl Seçin"
              value={selectedYear}
              options={years}
              disabled={!selectedModel}
              onChange={setSelectedYear}
            />
            {isFiltered && (
              <button
                onClick={() => {
                  setSelectedMake("");
                  setSelectedModel("");
                  setSelectedYear("");
                }}
                className="font-body text-sm text-zinc-500 hover:text-zinc-900 px-4 py-3 rounded-xl border border-zinc-200 hover:border-zinc-400 transition-colors whitespace-nowrap"
              >
                Sıfırla ✕
              </button>
            )}
          </div>

          {isFiltered && (
            <div className="mt-4 flex items-center gap-2 text-xs font-body text-zinc-700 bg-brand-red/5 border border-brand-red/15 rounded-lg px-4 py-2">
              <span className="text-brand-red font-semibold">Filtrələnib:</span>
              <span>
                {selectedMake} · {selectedModel} · {selectedYear}
              </span>
            </div>
          )}
        </motion.div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-20 text-zinc-400 font-body">
            <p className="text-lg text-zinc-600">Bu konfiqurasiya üçün məhsul tapılmadı.</p>
            <p className="text-sm mt-2">Zəhmət olmasa WhatsApp vasitəsilə bizimlə əlaqə saxlayın.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-1">
            {displayedProducts.map((product) =>
              product.category === "spacer" ? (
                <SpacerCard
                  key={product.id}
                  product={product as SpacerProduct}
                  make={selectedMake || undefined}
                  model={selectedModel || undefined}
                  year={selectedYear || undefined}
                />
              ) : (
                <CoiloverCard key={product.id} product={product as CoiloverProduct} />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
