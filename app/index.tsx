import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
export default function Index() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <TouchableOpacity
        onPress={() => router.push("/(quiz)/users")}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white text-2xl">Go to quiz</Text>
      </TouchableOpacity>
    </View>
  );
}
