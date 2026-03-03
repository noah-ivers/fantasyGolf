import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function LeagueSettingsScreen() {
    const { leagueId } = useLocalSearchParams<{ leagueId: string }>();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">League Settings</ThemedText>
            <ThemedText>League ID: {leagueId}</ThemedText>
            {/* form to modify draft rules, max players, point values, etc. */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});
