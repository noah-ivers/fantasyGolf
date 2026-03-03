import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function LeagueDraftScreen() {
    const { leagueId } = useLocalSearchParams<{ leagueId: string }>();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Draft for League {leagueId}</ThemedText>
            {/* TODO: implement snake draft UI, timer, picks, etc. */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});
