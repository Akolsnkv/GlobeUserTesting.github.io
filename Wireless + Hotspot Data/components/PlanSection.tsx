import { ReactNode } from "react";

interface PlanSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  footnote?: string;
  children: ReactNode;
}

const PlanSection = ({ icon, title, description, footnote, children }: PlanSectionProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-foreground">{icon}</span>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{description}</p>
      {footnote && (
        <p className="text-xs text-muted-foreground mb-4">{footnote}</p>
      )}
      <div className="flex flex-col gap-2 mt-4">{children}</div>
    </div>
  );
};

export default PlanSection;
