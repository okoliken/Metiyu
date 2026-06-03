import Svg, { Path } from "react-native-svg";

type IconProps = {
  color?: string;
  size?: number;
};

export function StarIcon({ color = "#F6910A", size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19204 2.14006C7.49071 1.42206 8.50938 1.42206 8.80804 2.14006L10.196 5.4774L13.7987 5.76673C14.5747 5.82873 14.8894 6.79673 14.298 7.3034L11.5534 9.65473L12.3914 13.1701C12.572 13.9274 11.7487 14.5254 11.0847 14.1201L8.00004 12.2361L4.91538 14.1201C4.25138 14.5254 3.42804 13.9267 3.60871 13.1701L4.44671 9.65473L1.70204 7.3034C1.11071 6.79673 1.42538 5.82873 2.20138 5.76673L5.80404 5.4774L7.19204 2.14006Z"
        fill={color}
      />
    </Svg>
  );
}
