import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff3e0',
    borderColor: '#ffe0b2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#c64d00',
  },
  badge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
  },
  chipTodo: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  chipInProgress: {
    backgroundColor: '#fff7ed',
    borderColor: '#ffcc80',
  },
  chipDone: {
    backgroundColor: '#e8f5e9',
    borderColor: '#a5d6a7',
  },
  chipTextDone: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#ffe6cc',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff9800',
  },
  progressText: {
    marginTop: 6,
    fontSize: 12,
    color: '#7a5d3b',
    textAlign: 'right',
  },
});
