import Svg, { Circle, Path } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function SearchIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={1.6} />
      <Path
        d="M20 20L16.65 16.65"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}
