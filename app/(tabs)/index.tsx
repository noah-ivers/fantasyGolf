import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const activeTint = Colors[colorScheme].tint;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A8D5A2', dark: '#274E13' }}
      headerImage={
        <View style={styles.headerGraphic}>
          <ThemedText style={styles.headerEmoji}>⛳️</ThemedText>
          <ThemedText style={styles.headerLabel}>TEE TIME</ThemedText>
        </View>
      }>
      <ThemedView style={styles.heroCard} lightColor="#EAF8EA" darkColor="#1D2B1D">
        <ThemedText type="title">Fantasy Golf</ThemedText>
        <ThemedText type="subtitle">Build your league. Draft your golfers. Win the season.</ThemedText>
        <ThemedText>
          Weekly two-round snake drafts with season-long standings, major boosts, and Golden Golfer strategy.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionCard}>
        <ThemedText type="subtitle">Quick Actions</ThemedText>
        <View style={styles.actionsRow}>
          <Link href="/leagues" asChild>
            <Pressable style={[styles.primaryAction, { backgroundColor: activeTint }]}>
              <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" type="defaultSemiBold">
                Create League
              </ThemedText>
            </Pressable>
          </Link>
          <Link href="/leagues" asChild>
            <Pressable style={styles.secondaryAction}>
              <ThemedText type="defaultSemiBold">Join League</ThemedText>
            </Pressable>
          </Link>
        </View>
      </ThemedView>

      <ThemedView style={styles.sectionCard}>
        <ThemedText type="subtitle">This Week</ThemedText>
        <ThemedText>Round 1 draft: Tuesday</ThemedText>
        <ThemedText>Round 2 draft: Wednesday</ThemedText>
        <ThemedText>Pick window: 1 hour per turn, snake order</ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionCard}>
        <ThemedText type="subtitle">Scoring Snapshot</ThemedText>
        <ThemedText>• Make the cut = points from total prize money</ThemedText>
        <ThemedText>• Miss the cut = 0 points</ThemedText>
        <ThemedText>• Majors + Players = double points</ThemedText>
        <ThemedText>• Golden Golfer = one-time round-two boost (non-major week)</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 18,
    padding: 18,
    gap: 8,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.25)',
  },
  actionsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  secondaryAction: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.35)',
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
  },
  headerGraphic: {
    height: 178,
    width: 290,
    left: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerEmoji: {
    fontSize: 58,
    lineHeight: 64,
  },
  headerLabel: {
    marginTop: 6,
    letterSpacing: 2,
    fontWeight: '700',
  },
});
