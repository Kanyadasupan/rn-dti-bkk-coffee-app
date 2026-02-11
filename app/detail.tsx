import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {

  const handleOpenMapApp = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${params.name as string}&query_place_id=${params.id as string}`;
    const appleMapsUrl = `http://maps.apple.com/?q=${params.name as string}&ll=${params.latitude as string},${params.longitude as string}`;
    Linking.canOpenURL(googleMapsUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(googleMapsUrl);
        } else {
          Linking.openURL(appleMapsUrl);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCallApp = () => {
    const phone = params.phone;
    const url = `tel:${phone}`;
    Linking.openURL(url);
  };

  const params = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Image
        source={{ uri: params.image_url as string }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{params.name}</Text>
        <Text style={styles.district}>🚩 {params.district}</Text>
        <Text style={styles.description}>{params.description}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleCallApp}
        >
          <Text style={styles.backButtonText}>📞 {params.phone as string}</Text>
        </TouchableOpacity>
        <Text style={styles.maptext}>แผนที่ร้าน</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longitude as string),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
        <Marker
          coordinate={{
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longitude as string),
          }}
          title={params.name as string}
          description={params.description as string}
          onPress={handleOpenMapApp}
        />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
    fontFamily: "Prompt_700Bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Prompt_400Regular",
  },
  district: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Prompt_400Regular",
  },
  backButton: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#A67B5B",
    borderRadius: 8,
    fontFamily: "Prompt_400Regular",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Prompt_400Regular",
  },
  maptext: {
    marginTop: 24,
    fontSize: 18,
    fontFamily: "Prompt_700Bold",
  },
  map: {
    marginTop: 12,
    width: "100%",
    height: 300,
  },
  infoContainer: {
    marginTop: 16,
    marginBottom: 50,
  },
});
