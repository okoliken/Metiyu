import { forwardRef } from "react";
import { Text as RNText, type TextProps } from "react-native";

/**
 * App-wide Text. Defaults to the Instrument Sans family (font-sans); any weight
 * class passed via className (font-medium/semibold/bold) overrides it since it
 * comes later in the class list.
 */
export const AppText = forwardRef<RNText, TextProps>(function AppText(
  { className, ...props },
  ref,
) {
  return (
    <RNText ref={ref} className={`font-sans ${className ?? ""}`} {...props} />
  );
});
