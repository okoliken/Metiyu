import Svg, { Path } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function BagIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.6666 6.66675C10.6666 7.37399 10.3857 8.05227 9.8856 8.55237C9.3855 9.05246 8.70722 9.33341 7.99998 9.33341C7.29274 9.33341 6.61446 9.05246 6.11436 8.55237C5.61426 8.05227 5.33331 7.37399 5.33331 6.66675"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.06866 4.02271H13.9313"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.26667 3.64459C2.09357 3.87538 2 4.15609 2 4.44458V13.3333C2 13.6869 2.14048 14.026 2.39052 14.2761C2.64057 14.5261 2.97971 14.6666 3.33333 14.6666H12.6667C13.0203 14.6666 13.3594 14.5261 13.6095 14.2761C13.8595 14.026 14 13.6869 14 13.3333V4.44458C14 4.15609 13.9064 3.87538 13.7333 3.64459L12.4 1.86659C12.2758 1.70099 12.1148 1.56659 11.9296 1.47402C11.7445 1.38145 11.5403 1.33325 11.3333 1.33325H4.66667C4.45967 1.33325 4.25552 1.38145 4.07038 1.47402C3.88524 1.56659 3.7242 1.70099 3.6 1.86659L2.26667 3.64459Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
