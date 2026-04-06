import { useState, useMemo } from "react";
import PlanSection from "@/components/PlanSection";
import PlanOption from "@/components/PlanOption";
import { Wifi, Radio } from "lucide-react";

const WIRELESS_OPTIONS = [
  { id: "1gb", label: "1GB", sublabel: "Hotspot data not available", price: null, included: true, tier: 0 },
  { id: "5gb", label: "5GB", price: "$5.00", tier: 1 },
  { id: "15gb", label: "15GB", price: "$10.00", tier: 2 },
  { id: "unlimited-sd", label: "Unlimited - SD", sublabel: "Standard-definition streaming", price: "$20.00", tier: 3, footnote: "AT&T may temporarily slow data speeds if the network is busy." },
  { id: "unlimited-hd", label: "Unlimited - HD", sublabel: "4K ultra-high def streaming", price: "$35.00", tier: 4, footnote: "AT&T may temporarily slow data speeds if the network is busy." },
];

const HOTSPOT_OPTIONS = [
  { id: "none", label: "None", price: null, requiredTier: 1 },
  { id: "hotspot-not-available", label: "Hotspot data not available", sublabel: "Select 5GB Wireless data for more options", price: null, requiredTier: -1 },
  { id: "hotspot-5gb", label: "5GB", sublabel: "Requires 5GB wireless data", price: "$5.00", requiredTier: 1 },
  { id: "hotspot-25gb", label: "25GB", sublabel: "Requires Unlimited wireless data", price: "$15.00", requiredTier: 3 },
  { id: "hotspot-50gb", label: "50GB", sublabel: "Requires Unlimited wireless data", price: "$20.00", requiredTier: 3 },
];

const PlanConfigurator = () => {
  const [selectedWireless, setSelectedWireless] = useState("1gb");
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const wirelessTier = useMemo(() => {
    return WIRELESS_OPTIONS.find((o) => o.id === selectedWireless)?.tier ?? 0;
  }, [selectedWireless]);

  // When wireless changes, reset hotspot if it becomes invalid
  const handleWirelessChange = (id: string) => {
    setSelectedWireless(id);
    const newTier = WIRELESS_OPTIONS.find((o) => o.id === id)?.tier ?? 0;
    if (newTier === 0) {
      setSelectedHotspot(null);
    } else if (selectedHotspot) {
      const currentHotspot = HOTSPOT_OPTIONS.find((o) => o.id === selectedHotspot);
      if (currentHotspot && currentHotspot.requiredTier > newTier) {
        setSelectedHotspot("none");
      }
    }
  };

  const showHotspotUnavailable = wirelessTier === 0;

  // Calculate total
  const wirelessPrice = WIRELESS_OPTIONS.find((o) => o.id === selectedWireless);
  const hotspotPrice = HOTSPOT_OPTIONS.find((o) => o.id === selectedHotspot);

  const parsePrice = (p: string | null | undefined) => {
    if (!p) return 0;
    return parseFloat(p.replace("$", ""));
  };

  const total = 15 + parsePrice(wirelessPrice?.price) + parsePrice(hotspotPrice?.price);

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Customize your plan</h1>

        {/* Base Plan */}
        <div className="rounded-xl p-6 shadow-sm mb-4" style={{ backgroundColor: '#DCF3FA' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-foreground" />
              <h2 className="text-lg font-bold text-foreground">Base plan</h2>
            </div>
            <span className="text-lg font-bold text-foreground">
              $15.00<span className="text-sm font-normal text-muted-foreground">/mo.</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Unlimited talk, text, and 1GB wireless data included.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Plus taxes & fees. After 1GB, speeds slowed to a maximum of 128Kbps.{" "}
            <a href="#" className="underline">See plan details</a>
          </p>
        </div>

        {/* Wireless Data */}
        <div className="mb-4">
          <PlanSection
            icon={<Wifi className="w-5 h-5" />}
            title="Wireless data"
            description="Connects your phone to the internet using our cellular network (when there's no Wi-Fi). If you also want to add optional hotspot data below, choose an equal or greater amount of wireless data first."
            footnote="Plus taxes & fees. For 1GB, 5GB, and 15GB, after allotted data is used, speeds slowed to a maximum of 128Kbps."
          >
            {WIRELESS_OPTIONS.map((opt) => (
              <PlanOption
                key={opt.id}
                label={opt.label}
                sublabel={opt.sublabel}
                price={opt.price ?? undefined}
                included={opt.included}
                selected={selectedWireless === opt.id}
                onClick={() => handleWirelessChange(opt.id)}
                footnote={opt.footnote}
              />
            ))}
          </PlanSection>
        </div>

        {/* Hotspot Data */}
        <div className="mb-6">
          <PlanSection
            icon={<Radio className="w-5 h-5" />}
            title="Hotspot data"
            description="Extra data set aside for other wireless devices that connect to your phone. Requires an equal or greater amount of wireless data."
            footnote="Plus taxes & fees. After allotted data is used, speeds slowed to a maximum of 128Kbps. See details"
          >
            <>
              <PlanOption
                label="None"
                selected={selectedHotspot === "none" || selectedHotspot === null}
                onClick={() => setSelectedHotspot("none")}
              />
              {HOTSPOT_OPTIONS.filter((o) => o.id !== "none" && o.id !== "hotspot-not-available").map((opt) => (
                <PlanOption
                  key={opt.id}
                  label={opt.label}
                  sublabel={opt.sublabel}
                  price={opt.price ?? undefined}
                  selected={selectedHotspot === opt.id}
                  disabled={opt.requiredTier > wirelessTier}
                  onClick={() => setSelectedHotspot(opt.id)}
                />
              ))}
            </>
          </PlanSection>
        </div>
      </div>

      {/* Sticky Footer Total */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">Estimated monthly total</span>
            <span className="text-2xl font-bold text-foreground">
              ${total.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/mo.</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Plus taxes & fees</p>
        </div>
      </div>
    </div>
  );
};

export default PlanConfigurator;
