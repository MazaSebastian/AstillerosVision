"use client";

import { useConfiguratorStore, configBoatModels } from "@/store/useConfiguratorStore";
import { cn } from "@/lib/utils";
import { Check, Send } from "lucide-react";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export default function ConfigPanel() {
  const {
    selectedBoat, selectedColorId, activeAccessoryIds, totalPrice,
    selectBoat, setColor, toggleAccessory, getPayload,
  } = useConfiguratorStore();

  const handleCotizacion = () => {
    const payload = getPayload();
    alert(
      `Cotización enviada!\n\nBarco: ${payload.boat}\nColor: ${payload.color}\nAccesorios: ${payload.accessories.length > 0 ? payload.accessories.join(", ") : "Ninguno"}\nTotal: ${formatPrice(payload.totalPrice)}`
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 space-y-6">
      {/* Model Selector */}
      <div>
        <h3 className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3">Modelo</h3>
        <div className="space-y-2">
          {configBoatModels.map((boat) => (
            <button
              key={boat.id}
              onClick={() => selectBoat(boat.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                selectedBoat.id === boat.id
                  ? "bg-brand-500/10 border border-brand-500/30 text-brand-400"
                  : "bg-white/[0.03] border border-white/5 text-dark-300 hover:bg-white/[0.05]"
              )}
            >
              <span className="block font-semibold">{boat.name}</span>
              <span className="text-xs opacity-70">Desde {formatPrice(boat.basePrice)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div>
        <h3 className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3">Color del Casco</h3>
        <div className="flex flex-wrap gap-3">
          {selectedBoat.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setColor(color.id)}
              title={color.name}
              className={cn(
                "relative h-10 w-10 rounded-full border-2 transition-all hover:scale-110",
                selectedColorId === color.id
                  ? "border-brand-400 ring-2 ring-brand-500/30 ring-offset-2 ring-offset-dark-900"
                  : "border-white/10 hover:border-white/30"
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColorId === color.id && (
                <Check
                  className="absolute inset-0 m-auto h-4 w-4"
                  style={{ color: color.hex === "#FAFAFA" || color.hex === "#F5F5F0" ? "#1C1C1E" : "#FFFFFF" }}
                />
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-dark-500">
          {selectedBoat.colors.find((c) => c.id === selectedColorId)?.name}
        </p>
      </div>

      {/* Accessories */}
      <div>
        <h3 className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3">Accesorios</h3>
        <div className="space-y-2">
          {selectedBoat.accessories.map((acc) => {
            const isActive = activeAccessoryIds.has(acc.id);
            return (
              <button
                key={acc.id}
                onClick={() => toggleAccessory(acc.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3",
                  isActive
                    ? "bg-brand-500/10 border border-brand-500/20"
                    : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.05]"
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 min-w-5 items-center justify-center rounded border transition-all",
                    isActive ? "bg-brand-500 border-brand-500" : "border-dark-500"
                  )}
                >
                  {isActive && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={cn("block font-medium", isActive ? "text-brand-400" : "text-dark-300")}>{acc.name}</span>
                  <span className="block text-xs text-dark-500 truncate">{acc.description}</span>
                </div>
                <span className="text-xs font-semibold text-dark-400 whitespace-nowrap">+{formatPrice(acc.price)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-dark-400">
            <span>Precio base</span>
            <span>{formatPrice(selectedBoat.basePrice)}</span>
          </div>
          {selectedBoat.accessories
            .filter((a) => activeAccessoryIds.has(a.id))
            .map((acc) => (
              <div key={acc.id} className="flex justify-between text-sm text-dark-400">
                <span className="truncate mr-2">{acc.name}</span>
                <span className="whitespace-nowrap">{formatPrice(acc.price)}</span>
              </div>
            ))}
          <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/5">
            <span>Total</span>
            <span className="gradient-text">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <button
          onClick={handleCotizacion}
          className="group w-full flex items-center justify-center gap-2 rounded-xl gradient-red px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-brand-500/20"
        >
          <Send className="h-4 w-4" />
          Solicitar Cotización
        </button>
      </div>
    </div>
  );
}
