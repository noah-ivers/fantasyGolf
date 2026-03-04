import { useLeagues } from '@/contexts/leagues-context';
import {
  defaultLeagueSettings,
  LEAGUE_MAX_PLAYERS,
  LEAGUE_MIN_PLAYERS,
  League,
  LeagueSettings,
} from '@/models/league';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const MASTERS_GREEN = '#0B6623';
const MASTERS_CREAM = '#F5F0E6';
const MASTERS_DARK_BG = '#0D1F0D';
const MASTERS_GOLD = '#C9A227';

const PLACEHOLDER_OWNER = 'me'; // TODO: replace with real auth

export default function CreateLeagueScreen() {
  const router = useRouter();
  const { addLeague } = useLeagues();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const tint = Colors[colorScheme].tint;

  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [doubleMajors, setDoubleMajors] = useState(true);
  const [allowLIV, setAllowLIV] = useState(false);
  const [snakeOrder, setSnakeOrder] = useState(true);
  const [pickTimeLimitMinutes, setPickTimeLimitMinutes] = useState(60);
  const [allowGoldenGolfer, setAllowGoldenGolfer] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const settings: LeagueSettings = defaultLeagueSettings({
    name: name.trim() || 'New League',
    owner: PLACEHOLDER_OWNER,
    maxPlayers,
    scoring: {
      doubleMajors,
      allowLIV,
      pointValues: { 1: 350, 2: 100, 3: 50 },
    },
    draft: {
      snakeOrder,
      pickTimeLimitMinutes,
      allowGoldenGolfer,
    },
    draftOrderThisWeek: [],
  });

  const handleCreate = () => {
    if (submitting) return;
    setSubmitting(true);
    const league: League = {
      id: `league-${Date.now()}`,
      settings,
      members: [PLACEHOLDER_OWNER],
    };
    addLeague(league);
    setSubmitting(false);
    router.replace('/leagues');
  };

  const bg = isDark ? MASTERS_DARK_BG : MASTERS_CREAM;
  const cardBg = isDark ? '#152515' : '#EBE6DC';
  const textColor = isDark ? '#E8E4DC' : '#1a2e1a';
  const labelColor = isDark ? MASTERS_GOLD : MASTERS_GREEN;

  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={[styles.title, { color: labelColor }]}>
          Create league
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}>
          Set name, size (2–20 players), and options below.
        </ThemedText>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.label, { color: labelColor }]}>League name</ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Masters Pool 2026"
            placeholderTextColor={isDark ? '#888' : '#666'}
            style={[styles.input, { color: textColor, borderColor: isDark ? MASTERS_GOLD : MASTERS_GREEN }]}
          />
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.label, { color: labelColor }]}>
            Number of players ({LEAGUE_MIN_PLAYERS}–{LEAGUE_MAX_PLAYERS})
          </ThemedText>
          <View style={styles.row}>
            <Pressable
              onPress={() => setMaxPlayers((n) => Math.max(LEAGUE_MIN_PLAYERS, n - 1))}
              style={[styles.stepperBtn, { borderColor: labelColor }]}>
              <ThemedText style={{ color: labelColor }}>−</ThemedText>
            </Pressable>
            <ThemedText style={[styles.stepperValue, { color: textColor }]}>{maxPlayers}</ThemedText>
            <Pressable
              onPress={() => setMaxPlayers((n) => Math.min(LEAGUE_MAX_PLAYERS, n + 1))}
              style={[styles.stepperBtn, { borderColor: labelColor }]}>
              <ThemedText style={{ color: labelColor }}>+</ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.sectionLabel, { color: labelColor }]}>Scoring</ThemedText>
          <RowSwitch
            label="Double points for Majors + Players"
            value={doubleMajors}
            onValueChange={setDoubleMajors}
            textColor={textColor}
          />
          <RowSwitch
            label="Allow LIV golfers"
            value={allowLIV}
            onValueChange={setAllowLIV}
            textColor={textColor}
          />
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.sectionLabel, { color: labelColor }]}>Draft</ThemedText>
          <RowSwitch
            label="Snake order (round 2 reverses)"
            value={snakeOrder}
            onValueChange={setSnakeOrder}
            textColor={textColor}
          />
          <RowSwitch
            label="Golden Golfer (one-time boost)"
            value={allowGoldenGolfer}
            onValueChange={setAllowGoldenGolfer}
            textColor={textColor}
          />
          <View style={styles.row}>
            <ThemedText style={[styles.label, { color: textColor }]}>
              Pick time limit (minutes, 0 = no limit)
            </ThemedText>
            <TextInput
              value={String(pickTimeLimitMinutes)}
              onChangeText={(t) => setPickTimeLimitMinutes(Math.max(0, parseInt(t, 10) || 0))}
              keyboardType="number-pad"
              style={[styles.smallInput, { color: textColor, borderColor: labelColor }]}
            />
          </View>
        </View>

        <Pressable
          onPress={handleCreate}
          disabled={submitting}
          style={[styles.createBtn, { backgroundColor: tint }]}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText lightColor="#FFFFFF" darkColor="#FFFFFF" type="defaultSemiBold">
              Create league
            </ThemedText>
          )}
        </Pressable>

        <Link href="/leagues" asChild>
          <Pressable style={[styles.cancelBtn, { borderColor: labelColor }]}>
            <ThemedText style={{ color: labelColor }}>Cancel</ThemedText>
          </Pressable>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}

function RowSwitch({
  label,
  value,
  onValueChange,
  textColor,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  textColor: string;
}) {
  return (
    <View style={styles.switchRow}>
      <ThemedText style={[styles.switchLabel, { color: textColor }]}>{label}</ThemedText>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#666', true: MASTERS_GREEN }} thumbColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { marginBottom: 4 },
  subtitle: { marginBottom: 20, fontSize: 14 },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(11, 102, 35, 0.3)',
  },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  sectionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  smallInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    minWidth: 56,
    textAlign: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  stepperBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: { fontSize: 20, fontWeight: '700', minWidth: 32, textAlign: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  switchLabel: { flex: 1, fontSize: 15 },
  createBtn: {
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  cancelBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    marginTop: 12,
  },
});
