import { useLeagues } from '@/contexts/leagues-context';
import {
  defaultLeagueSettings,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Masters } from '@/constants/theme';

const PLACEHOLDER_OWNER = 'me'; // TODO: replace with real auth

const MIN_LEAGUE_NAME_LENGTH = 4;

function isValidLeagueName(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < MIN_LEAGUE_NAME_LENGTH) return false;
  if (/\s/.test(trimmed)) return false; // no whitespace allowed
  return true;
}

export default function CreateLeagueScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addLeague } = useLeagues();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const tint = Colors[colorScheme].tint;
  const createBtnBg = isDark ? Masters.greenDark : tint;
  const bg = isDark ? Masters.darkBg : Masters.cream;
  const cardBg = isDark ? Masters.darkBgAlt : Masters.creamAlt;
  const textColor = isDark ? Masters.cardTextDark : Masters.cardTextLight;
  const labelColor = isDark ? Masters.goldBright : Masters.green;

  const [name, setName] = useState('');
  const [doubleMajors, setDoubleMajors] = useState(true);
  const [allowLIV, setAllowLIV] = useState(false);
  const [snakeOrder, setSnakeOrder] = useState(true);
  const [pickTimeLimitMinutes, setPickTimeLimitMinutes] = useState(60);
  const [allowGoldenGolfer, setAllowGoldenGolfer] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const settings: LeagueSettings = defaultLeagueSettings({
    name: name.trim(),
    owner: PLACEHOLDER_OWNER,
    maxPlayers: 1, // grows as users are invited
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
    if (submitting || !isValidLeagueName(name)) return;
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

  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top, 20) }]}
      >
        <ThemedText type="title" style={[styles.title, { color: labelColor }]}>
          Create league
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}>
          Set name and options below. Invite members after creating.
        </ThemedText>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.label, { color: labelColor }]}>League name</ThemedText>
          <TextInput
            value={name}
            onChangeText={(t) => setName(t.replace(/\s/g, ''))}
            placeholder="e.g. MastersPool2026"
            placeholderTextColor={isDark ? '#888' : '#666'}
            style={[styles.input, { color: textColor, borderColor: labelColor }]}
          />
          {name.length > 0 && !isValidLeagueName(name) && (
            <ThemedText style={[styles.errorText, { color: '#c62828' }]}>
              Min {MIN_LEAGUE_NAME_LENGTH} characters, no spaces
            </ThemedText>
          )}
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
          disabled={submitting || !isValidLeagueName(name)}
          style={[
            styles.createBtn,
            {
              backgroundColor: createBtnBg,
              opacity: submitting || !isValidLeagueName(name) ? 0.6 : 1,
            },
          ]}>
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
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#666', true: Masters.green }} thumbColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { marginBottom: 4, textAlign: 'center' },
  subtitle: { marginBottom: 20, fontSize: 14, textAlign: 'center' },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Masters.cardBorder,
  },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  errorText: { fontSize: 12, marginTop: 6 },
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 12,
    minHeight: 52,
  },
});
