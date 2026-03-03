import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet } from 'react-native';

export default function LeagueDetail() {
    const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">League {leagueId}</ThemedText>
            <Link href={`/leagues/${leagueId}/settings`} asChild>
                <Button title="Edit Settings" />
            </Link>
            <Link href={`/leagues/${leagueId}/draft`} asChild>
                <Button title="Go To Draft" />
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});
