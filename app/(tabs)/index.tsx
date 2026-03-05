import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';

const MASTERS_GREEN = '#346C50';
const MASTERS_CREAM = '#DAD9D4';
const MASTERS_DARK_BG = '#21483C';
const MASTERS_GOLD = '#fce300';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const activeTint = Colors[colorScheme].tint;
  const isDark = colorScheme === 'dark';
  const cardBg = isDark ? MASTERS_DARK_BG : MASTERS_CREAM;
  const cardText = isDark ? '#E8E4DC' : '#1a2e1a';
  const sectionTitleColor = isDark ? MASTERS_GOLD : MASTERS_GREEN;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0B6623', dark: '#012512' }}
      contentBackgroundColor={{ light: MASTERS_CREAM, dark: MASTERS_DARK_BG }}
      headerImage={
        <ImageBackground
          source={require('@/assets/augusta-national.jpg')}
          resizeMode="cover"
          style={styles.headerGraphic}
          imageStyle={styles.headerImage}>
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <ThemedText style={styles.headerTitle}>FANTASY GOLF</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Weekly fantasy built for Golf Enthusiasts.
            </ThemedText>
          </View>
        </ImageBackground>
      }>
      <ThemedView style={styles.heroCard} lightColor={MASTERS_CREAM} darkColor={MASTERS_DARK_BG}>
        <ThemedText
          type="title"
          lightColor={MASTERS_GREEN}
          darkColor={MASTERS_GOLD}
          style={styles.mastersTitle}>
          Fantasy Golf
        </ThemedText>
        <ThemedText
          type="subtitle"
          lightColor={MASTERS_GREEN}
          darkColor={MASTERS_GOLD}
          style={styles.mastersSubtitle}>
          Build your league. Draft your golfers. Win the season.
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          Weekly two-round snake drafts with season-long standings, major boosts, and Golden Golfer strategy.
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg }]}>
        <ThemedText
          type="subtitle"
          lightColor={sectionTitleColor}
          darkColor={sectionTitleColor}
          style={styles.mastersSubtitle}>
          Quick Actions
        </ThemedText>
        <View style={styles.actionsRow}>
          <Link href="/leagues" asChild>
            <Pressable style={[styles.primaryAction, { backgroundColor: activeTint }]}>
              <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" type="defaultSemiBold">
                Create League
              </ThemedText>
            </Pressable>
          </Link>
          <Link href="/leagues" asChild>
            <Pressable style={[styles.secondaryAction, { backgroundColor: isDark ? 'transparent' : MASTERS_CREAM, borderColor: isDark ? MASTERS_GOLD : MASTERS_GREEN }]}>
              <ThemedText
                type="defaultSemiBold"
                lightColor={MASTERS_GREEN}
                darkColor={MASTERS_GOLD}>
                Join League
              </ThemedText>
            </Pressable>
          </Link>
        </View>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg }]}>
        <ThemedText
          type="subtitle"
          lightColor={sectionTitleColor}
          darkColor={sectionTitleColor}
          style={styles.mastersSubtitle}>
          This Week
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          Round 1 draft: Tuesday
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          Round 2 draft: Wednesday
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          Pick window: 1 hour per turn, snake order
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.sectionCard, { backgroundColor: cardBg }]}>
        <ThemedText
          type="subtitle"
          lightColor={sectionTitleColor}
          darkColor={sectionTitleColor}
          style={styles.mastersSubtitle}>
          Scoring Snapshot
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          • Make the cut = points from total prize money
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          • Miss the cut = 0 points
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          • Majors + Players = double points
        </ThemedText>
        <ThemedText lightColor={cardText} darkColor={cardText}>
          • Golden Golfer = one-time round-two boost (non-major week)
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 18,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(11, 102, 35, 0.6)',
  },
  sectionCard: {
    borderRadius: 18,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(11, 102, 35, 0.4)',
  },
  mastersTitle: {
    fontFamily: 'Baskerville',
  },
  mastersSubtitle: {
    fontFamily: 'Baskerville',
  },
  actionsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  secondaryAction: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: MASTERS_GREEN,
    backgroundColor: MASTERS_CREAM,
  },
  headerGraphic: {
    height: 220,
    width: '100%',
    justifyContent: 'center',
  },
  headerImage: {
    width: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 58, 29, 0.6)',
  },
  headerContent: {
    alignItems: 'center',
    paddingBottom: 0,
    gap: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Baskerville',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(231, 255, 235, 0.9)',
  },
});
