import { type ReactNode } from "react";
import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  className?: string;
  edges?: Edge[];
};

export function Screen({
  children,
  className,
  edges = ["top", "bottom"],
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-neutral-950 ${className ?? ""}`}>
      {children}
    </SafeAreaView>
  );
}
