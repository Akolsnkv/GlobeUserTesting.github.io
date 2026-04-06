import { cn } from "@/lib/utils";

interface PlanOptionProps {
  label: string;
  sublabel?: string;
  price?: string;
  priceLabel?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  included?: boolean;
  footnote?: string;
}

const PlanOption = ({
  label,
  sublabel,
  price,
  priceLabel = "/mo.",
  selected = false,
  disabled = false,
  onClick,
  included = false,
  footnote,
}: PlanOptionProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all text-left",
        selected
          ? "border-ring bg-accent"
          : "border-border bg-card hover:border-muted-foreground/30",
        disabled && "opacity-40 cursor-not-allowed hover:border-border"
      )}
    >
      <div className="flex-1">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        )}
        {footnote && (
          <p className="text-xs text-muted-foreground mt-1 italic">{footnote}</p>
        )}
      </div>
      <div className="text-right">
        {included ? (
          <span className="text-sm font-bold text-foreground">Included</span>
        ) : price ? (
          <span className="text-sm font-bold text-foreground">
            {price}
            <span className="font-normal text-muted-foreground">{priceLabel}</span>
          </span>
        ) : null}
      </div>
    </button>
  );
};

export default PlanOption;
