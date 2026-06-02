import { type ReactNode } from "react";
import { View } from "react-native";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <View className={`flex-1 px-4 ${className ?? ""}`}>{children}</View>
  );
}
