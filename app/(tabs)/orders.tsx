import {} from "react-native";
import { AppText } from "@/components/ui/AppText";

import { Container } from "@/components/layout/Container";
import { Screen } from "@/components/layout/Screen";

export default function FavoritesScreen() {
  return (
    <Screen>
      <Container className="justify-center">
        <AppText className="text-2xl font-semibold text-slate-900">
          Favorites
        </AppText>
      </Container>
    </Screen>
  );
}
