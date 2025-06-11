
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface BottomSheetProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  trigger,
  title,
  children,
  open,
  onOpenChange
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div>
        {trigger}
        <div className="mt-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 overflow-y-auto flex-1">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BottomSheet;
