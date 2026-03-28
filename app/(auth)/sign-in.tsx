import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Masters } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const border = isDark ? Masters.cardBorder : Masters.cardBorderLight;
  const inputBg = isDark ? Masters.darkBgAlt : Masters.creamAlt;
  const placeholder = isDark ? '#737373' : '#737373';

  const signIn = () => {
    // TODO: hook up real authentication
    console.log('signing in', email);
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Sign in
      </ThemedText>
      <TextInput
        style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: isDark ? '#fff' : Masters.cardTextLight }]}
        placeholder="Email"
        placeholderTextColor={placeholder}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: inputBg, borderColor: border, color: isDark ? '#fff' : Masters.cardTextLight }]}
        placeholder="Password"
        placeholderTextColor={placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={[styles.button, { backgroundColor: isDark ? Masters.greenDark : Masters.green }]} onPress={signIn}>
        <ThemedText lightColor="#fff" darkColor="#fff" type="defaultSemiBold">
          Sign in
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
});
