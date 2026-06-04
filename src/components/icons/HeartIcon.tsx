import Svg, { Path } from "react-native-svg";

type IconProps = {
  filled?: boolean;
  size?: number;
  /** Outline color when not filled */
  color?: string;
  /** Fill color when filled */
  fillColor?: string;
};

const HEART_PATH =
  "M5.8225 10.455L5.819 10.4535L5.808 10.4475C5.74365 10.4121 5.6798 10.3758 5.6165 10.3385C4.85541 9.88628 4.14414 9.35501 3.4945 8.75354C2.344 7.68004 1.125 6.08704 1.125 4.12504C1.125 2.66104 2.357 1.50004 3.844 1.50004C4.25738 1.49801 4.66589 1.58921 5.03916 1.76684C5.41243 1.94447 5.74085 2.20397 6 2.52604C6.2592 2.2039 6.5877 1.94436 6.96106 1.76673C7.33443 1.58909 7.74304 1.49794 8.1565 1.50004C9.643 1.50004 10.875 2.66104 10.875 4.12504C10.875 6.08754 9.656 7.68054 8.5055 8.75304C7.85587 9.35452 7.1446 9.8858 6.3835 10.338C6.3202 10.3755 6.25636 10.412 6.192 10.4475L6.181 10.4535L6.1775 10.4555L6.176 10.456C6.12178 10.4848 6.06136 10.4998 6 10.4998C5.93864 10.4998 5.87822 10.4848 5.824 10.456L5.8225 10.455Z";

export function HeartIcon({
  filled = false,
  size = 14,
  color = "#747577",
  fillColor = "#ED5E5C",
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d={HEART_PATH}
        fill={filled ? fillColor : "none"}
        stroke={filled ? "none" : color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
