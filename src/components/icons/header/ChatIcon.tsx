import Svg, { Circle, Path } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function ChatIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8.5" cy="12" r="0.9" fill={color} />
      <Circle cx="12" cy="12" r="0.9" fill={color} />
      <Circle cx="15.5" cy="12" r="0.9" fill={color} />
    </Svg>
  );
}
