import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLeagues } from '@/contexts/leagues-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const MASTERS_GREEN = '#0B6623';
const MASTERS_CREAM = '#F5F0E6';
const MASTERS_DARK_BG = '#0D1F0D';
const MASTERS_GOLD = '#C9A227';

export default function LeaguesScreen() {
  const { leagues } = useLeagues();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const tint = Colors[colorScheme].tint;
  const bg = isDark ? MASTERS_DARK_BG : MASTERS_CREAM;
  const cardBg = isDark ? '#152515' : '#EBE6DC';
  const textColor = isDark ? '#E8E4DC' : '#1a2e1a';
  const labelColor = isDark ? MASTERS_GOLD : MASTERS_GREEN;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.header}>
        <ThemedText type="title" style={[styles.title, { color: labelColor }]}>
          My Leagues
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}>
          {leagues.length === 0
            ? 'Create a league or join one to get started.'
            : `${leagues.length} league${leagues.length === 1 ? '' : 's'}`}
        </ThemedText>
      </View>

      <Link href="/leagues/create" asChild>
        <Pressable style={[styles.createBtn, { backgroundColor: tint }]}>
          <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" type="defaultSemiBold">
            Create league
          </ThemedText>
        </Pressable>
      </Link>

      <FlatList
        data={leagues}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Link href={`/leagues/${item.id}`} asChild>
            <Pressable style={[styles.card, { backgroundColor: cardBg }]}>
              <ThemedText style={[styles.cardTitle, { color: labelColor }]}>
                {item.settings.name}
              </ThemedText>
              <ThemedText style={[styles.cardMeta, { color: textColor }]}>
                {item.members.length} / {item.settings.maxPlayers} players
              </ThemedText>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <ThemedText style={[styles.empty, { color: textColor }]}>
            No leagues yet. Tap “Create league” to add one.
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  title: { marginBottom: 4 },
  subtitle: { fontSize: 14 },
  createBtn: {
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 20,
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(11, 102, 35, 0.3)',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardMeta: { fontSize: 14 },
  empty: { textAlign: 'center', paddingVertical: 32 },
});
