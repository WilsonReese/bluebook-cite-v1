import { StyleSheet, Text, View } from "react-native";
import globalStyle from "../utils/styles";

export default function UploadButton() {
  return (
    <View style={s.container}>
      <Text style={globalStyle.text}>Test let's see what happens when I add text</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
		flex: 1,
    backgroundColor: "pink",
    paddingHorizontal: 8,
    alignItems: "center",
		justifyContent: 'center',
		borderWidth: 1,
		marginHorizontal: 4,
	},
});
