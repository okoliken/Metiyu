import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

type SortSheetProps = {
  visible: boolean;
  options: readonly string[];
  selected: string;
  onSelect: (option: string) => void;
  onClose: () => void;
};

function Radio({ active }: { active: boolean }) {
  return (
    <View
      className="h-5 w-5 items-center justify-center rounded-full border-2"
      style={{ borderColor: active ? colors.primary : colors.neutral[600] }}
    >
      {active ? (
        <View
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: colors.primary }}
        />
      ) : null}
    </View>
  );
}

export function SortSheet({
  visible,
  options,
  selected,
  onSelect,
  onClose,
}: SortSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop — tap to dismiss */}
      <Pressable className="flex-1 bg-black/60 relative" onPress={onClose} />

      {/* Floating panel — detached from the screen edges */}
      <View
        className="absolute bottom-0 left-0 right-0 mx-3 rounded-[22px] bg-neutral-900 px-6 pt-1"
        style={{ marginBottom: insets.bottom + 12 }}
      >
        {/* Grab handle */}
        <View className="mb-4 h-1.5 w-[116px] self-center rounded-[9px] bg-neutral-950" />

        <View className="flex-col">
          {options.map((option) => {
            const active = option === selected;
            return (
              <Pressable
                key={option}
                onPress={() => onSelect(option)}
                className="flex-row items-center justify-between py-3"
              >
                <Text className="text-sm font-medium text-neutral-0">
                  {option}
                </Text>
                <Radio active={active} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}
