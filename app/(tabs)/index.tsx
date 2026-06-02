import { Text } from "react-native";

import { Container } from "@/components/layout/Container";
import { Screen } from "@/components/layout/Screen";

export default function HomeScreen() {
  return (
    <Screen>
      <Container className="justify-center">
        <Text className="text-2xl font-semibold text-slate-900">Home</Text>
        <Text className="mt-2 text-base text-slate-500">
          Welcome to Metiyu
        </Text>
      </Container>
    </Screen>
  );
}
