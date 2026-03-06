import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLeagues } from '@/contexts/leagues-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Masters } from '@/constants/theme';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LeaguesScreen() {
  const { leagues } = useLeagues();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const tint = Colors[colorScheme].tint;
  const createBtnBg = isDark ? Masters.greenDark : tint;
  const bg = isDark ? Masters.darkBg : Masters.cream;
  const cardBg = isDark ? Masters.darkBgAlt : Masters.creamAlt;
  const textColor = isDark ? Masters.cardTextDark : Masters.cardTextLight;
  const labelColor = isDark ? Masters.goldBright : Masters.green;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <ThemedText type="title" style={[styles.title, { color: labelColor }]}>
          My Leagues
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}>
          {leagues.length === 0
            ? 'Create a league or join one to get started.'
            : `${leagues.length} league${leagues.length === 1 ? '' : 's'}`}
        </ThemedText>
      </View>

      <View style={styles.createBtnWrap}>
        <Link href="/leagues/create" asChild>
          <Pressable style={styles.createBtnPressable}>
            <View
              style={[
                styles.createBtnInner,
                {
                  backgroundColor: createBtnBg,
                  borderColor: Masters.gold,
                },
              ]}>
              <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" type="defaultSemiBold">
                Create league
              </ThemedText>
            </View>
          </Pressable>
        </Link>
      </View>

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
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12, alignItems: 'center' },
  title: { marginBottom: 4 },
  subtitle: { fontSize: 14 },
  createBtnWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  createBtnPressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtnInner: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    minWidth: 160,
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(11, 102, 35, 0.4)',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardMeta: { fontSize: 14 },
  empty: { textAlign: 'center', paddingVertical: 32 },
});
