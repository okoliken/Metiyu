import { forwardRef } from "react";
import { Text as RNText, type TextProps } from "react-native";

/**
 * App-wide Text. Defaults to Instrument Sans Regular (font-sans) ONLY when the
 * caller hasn't set a font class. NativeWind resolves conflicting font-family
 * utilities by stylesheet order, not className order — so always prepending
 * font-sans would override font-medium/semibold/bold. Skipping it when a font
 * class is present lets the weight face apply correctly.
 */
export const AppText = forwardRef<RNText, TextProps>(function AppText(
  { className, ...props },
  ref,
) {
  const hasFontClass = className?.includes("font-");
  const merged = hasFontClass ? className : `font-sans ${className ?? ""}`;
  return <RNText ref={ref} className={merged} {...props} />;
});
