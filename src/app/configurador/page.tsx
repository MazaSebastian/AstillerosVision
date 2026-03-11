"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import ConfigPanel from "@/components/configurator/ConfigPanel";
import { Loader2 } from "lucide-react";

const BoatCanvas = dynamic(
  () => import("@/components/configurator/BoatCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
      </div>
    ),
  }
);

function ConfiguradorContent() {
  const searchParams = useSearchParams();
  const { selectedBoat, selectedColorId, activeAccessoryIds, selectBoat } = useConfiguratorStore();

  useEffect(() => {
    const modelo = searchParams.get("modelo");
    if (modelo && modelo !== selectedBoat.id) {
      selectBoat(modelo);
    }
  }, [searchParams, selectedBoat.id, selectBoat]);

  const currentColor =
    selectedBoat.colors.find((c) => c.id === selectedColorId)?.hex ?? selectedBoat.colors[0].hex;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] pt-20">
      {/* 3D Canvas - 70% */}
      <div className="flex-1 lg:w-[70%] relative bg-dark-950">
        <BoatCanvas color={currentColor} activeAccessoryIds={activeAccessoryIds} />
        <div className="absolute bottom-4 left-4 glass rounded-lg px-4 py-2">
          <p className="text-xs text-dark-400">Arrastrá para rotar · Scroll para zoom</p>
        </div>
      </div>

      {/* Config Panel - 30% */}
      <div className="lg:w-[30%] min-w-[320px] glass border-l border-white/[0.06] overflow-hidden">
        <ConfigPanel />
      </div>
    </div>
  );
}

export default function ConfiguradorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
        </div>
      }
    >
      <ConfiguradorContent />
    </Suspense>
  );
}
