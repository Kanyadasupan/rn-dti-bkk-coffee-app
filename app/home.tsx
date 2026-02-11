import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { supabase } from "@/service/supabase";
import { CoffeeShop } from "@/types";
import { useEffect, useState } from "react";
import { router, useRouter } from "expo-router";

export default function Home() {
  //สร้าง state เพื่อเก็บข้อมูล coffee shops ที่ดึงมาจากฐานข้อมูล
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);

  // ดึงข้อมูล coffee shops จากฐานข้อมูล และเก็บใน state
  useEffect(() => {
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        Alert.alert(
          "คำเตือน",
          "เกิดข้อผิดพลาดในการดึงข้อมูลร้านกาแฟ กรุณาลองใหม่อีกครั้ง",
        );
      } else {
        setCoffeeShops(data);
      }
    };
    fetchCoffeeShops();
  }, []);

  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/detail", params: { id: item.id, name: item.name, image_url: item.image_url, description: item.description, district: item.district, phone: item.phone, latitude: item.latitude, longitude: item.longitude } })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.district}>🚩 {item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={coffeeShops} // ข้อมูลร้านกาแฟจาก state
        keyExtractor={(item) => item.id} // กำหนด key สำหรับแต่ละรายการ
        renderItem={renderShopItem} // ฟังก์ชันในการแสดงแต่ละรายการ
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 16,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontFamily: "Prompt_700Bold",
    fontSize: 18,
    color: "#333",
  },
  district: {
    fontFamily: "Prompt_400Regular",
    fontSize: 14,
    color: "#666",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
});
