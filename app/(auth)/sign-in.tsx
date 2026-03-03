import { ThemedText, ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        // TODO: hook up real authentication
        console.log('signing in', email);
        router.replace('/(tabs)');
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Sign in</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={signIn} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
});
