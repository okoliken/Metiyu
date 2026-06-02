import { Text } from "react-native";

import { Container } from "@/components/layout/Container";
import { Screen } from "@/components/layout/Screen";

export default function CategoryScreen() {
  return (
    <Screen>
      <Container className="justify-center">
        <Text className="text-2xl font-semibold text-slate-900">Category</Text>
      </Container>
    </Screen>
  );
}
