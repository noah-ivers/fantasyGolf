import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { League } from '@/models/league';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';

// placeholder data
const dummy: League[] = [];

export default function LeaguesScreen() {
    const [leagues] = useState<League[]>(dummy);

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">My Leagues</ThemedText>
            <Button title="Create League" onPress={() => { /* navigate to create form */ }} />
            <FlatList
                data={leagues}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link href={`/leagues/${item.id}`} style={styles.link}>
                        <ThemedText>{item.settings.name}</ThemedText>
                    </Link>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    link: { padding: 12, borderBottomWidth: 1 },
});
