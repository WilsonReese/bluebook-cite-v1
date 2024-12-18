import { StyleSheet, Text, View } from "react-native";
import globalStyle from "../utils/styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function UploadButton({icon}) {
	
  const icons = {
    photo: <FontAwesome name="photo" size={24} color="black" />,
    camera: <FontAwesome name="camera" size={24} color="black" />,
    file: <FontAwesome name="file-o" size={24} color="black" />,
  };

  const displayedIcon = icons[icon] || <Text>?</Text>;


  return (
    <View style={s.container}>
      <View>{displayedIcon}</View>
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
