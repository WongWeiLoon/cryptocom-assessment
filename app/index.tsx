import { Text, View } from "react-native";
import cryptoData from '@src/mockData/crypto/cryptoCurrencies.json';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Text>{JSON.stringify(cryptoData[0])}</Text> */}
      {
        cryptoData.map(item => <Text>{item.name}</Text>)
      }
    </View>
  );
}
