import { Text } from "react-native";

import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Screen } from "@/components/layout/Screen";

export default function HomeScreen() {
  return (
    <Screen edges={["top"]}>
      <Header />
      <Container className="justify-start pt-4">
        <Text className="text-base text-neutral-400">Welcome to Metiyu</Text>
      </Container>
    </Screen>
  );
}
