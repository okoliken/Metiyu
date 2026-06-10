import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { PaperclipIcon } from "@/components/icons/PaperclipIcon";
import { SendIcon } from "@/components/icons/SendIcon";
import { StarIcon } from "@/components/icons/StarIcon";
import { Screen } from "@/components/layout/Screen";
import { AppImage } from "@/components/ui/AppImage";
import { IconButton } from "@/components/ui/IconButton";
import { PressableScale } from "@/components/ui/PressableScale";
import { PRODUCTS } from "@/data/products";
import { colors } from "@/theme/colors";

type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    from: "me",
    text: "Hi, is this T-shirt still available?",
    time: "10:15 AM",
  },
  {
    id: "2",
    from: "them",
    text: "Hello! Yes, the T-shirt is still available. What size would you like?",
    time: "10:15 AM",
  },
  { id: "3", from: "me", text: "Do you have size L?", time: "10:15 AM" },
  {
    id: "4",
    from: "them",
    text: "Yes, size L is ready in stock 😊",
    time: "10:15 AM",
  },
  {
    id: "5",
    from: "me",
    text: "Okay, I will place the order.",
    time: "10:15 AM",
  },
  {
    id: "6",
    from: "them",
    text: "Great! I'll get that ready for you 😊",
    time: "10:15 AM",
  },
];

function formatTime(date: Date) {
  return date
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace(/^0/, "");
}

function MessageBubble({ message }: { message: Message }) {
  const mine = message.from === "me";
  return (
    <View
      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        mine ? "self-end bg-primary" : "self-start bg-neutral-800"
      }`}
    >
      <AppText
        className={`text-sm font-semibold leading-tight ${mine ? "text-neutral-950" : "text-neutral-0"}`}
      >
        {message.text}
      </AppText>
      <AppText
        className={`mt-1 font-medium text-xs ${
          mine ? "self-end text-neutral-700" : "text-neutral-400"
        }`}
      >
        {message.time}
      </AppText>
    </View>
  );
}

function ProductBubble({ productId }: { productId?: string }) {
  const product = PRODUCTS.find((item) => item.id === productId) ?? PRODUCTS[1];

  return (
    <View className="max-w-[85%] flex-row items-center gap-3 self-end rounded-2xl bg-neutral-800 p-3">
      <View className="h-14 w-14 overflow-hidden rounded-xl bg-neutral-950">
        <AppImage
          source={product.image}
          className="size-full"
          contentFit="contain"
        />
      </View>
      <View className="flex-1">
        <AppText
          className="text-xs font-semibold text-neutral-0"
          numberOfLines={1}
        >
          {product.name}
        </AppText>
        <View className="mt-0.5 flex-row items-center gap-1">
          <StarIcon size={14} />
          <AppText className="text-xs font-semibold text-neutral-0">
            {product.rating.toFixed(1)}
          </AppText>
          <AppText className="text-xs text-neutral-400">
            ({product.reviews} Reviews)
          </AppText>
        </View>
        <AppText className="mt-0.5 text-xs font-semibold text-neutral-0">
          ${product.price}
        </AppText>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        from: "me",
        text,
        time: formatTime(new Date()),
      },
    ]);
    setDraft("");
    requestAnimationFrame(() =>
      scrollRef.current?.scrollToEnd({ animated: true }),
    );
  };

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-center border-b border-neutral-800 px-4 pb-2">
        <IconButton
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="absolute left-4"
        >
          <ArrowLeftIcon color={colors.neutral[0]} />
        </IconButton>
        <AppText className="text-xl font-semibold text-neutral-0">
          Metiyu Customer Service
        </AppText>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top + 48}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          <ProductBubble productId={productId} />
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Input bar */}
        <View
          className="flex-row items-center gap-3 px-4 pt-2"
          style={{ paddingBottom: insets.bottom }}
        >
          <View className="h-[37px] flex-1 flex-row items-center gap-2 rounded-2xl bg-neutral-800 px-4">
            <PressableScale hitSlop={8} accessibilityLabel="Attach file">
              <PaperclipIcon color={colors.neutral[0]} />
            </PressableScale>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Type here..."
              placeholderTextColor={colors.neutral[400]}
              cursorColor={colors.primary}
              selectionColor={colors.primary}
              returnKeyType="send"
              onSubmitEditing={send}
              className="flex-1 text-neutral-0"
              style={{
                fontSize: 14,
                padding: 0,
                textAlignVertical: "center",
                includeFontPadding: false,
              }}
            />
          </View>
          <PressableScale
            onPress={send}
            accessibilityLabel="Send message"
            className="h-9 w-9 items-center justify-center rounded-xl bg-primary active:opacity-90 p-2.5"
          >
            <SendIcon color={colors.neutral[950]} size={15} />
          </PressableScale>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
