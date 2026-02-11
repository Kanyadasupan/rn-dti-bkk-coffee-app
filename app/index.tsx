import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
 
 
export default function SplashScreen() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);
 
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/coffeeshop.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Top 10 Bangkok Coffee</Text>
      <Text style={styles.caption}>ที่สุดของกาแฟในกรุงเทพฯ</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 150, height: 150, marginBottom: 20, borderRadius: 10 },
  title: { fontFamily: 'Prompt_700Bold', fontSize: 28, color: '#6F4E37' },
  caption: { fontFamily: 'Prompt_400Regular', fontSize: 16, color: '#888', marginTop: 10 },
});