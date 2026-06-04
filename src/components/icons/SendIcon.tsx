import Svg, { Path } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function SendIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 3L10.5 13.5M21 3L14.25 21L10.5 13.5M21 3L3 9.75L10.5 13.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
