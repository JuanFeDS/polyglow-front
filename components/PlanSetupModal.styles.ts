import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxWidth: 520,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 6, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  error: { color: '#d32f2f', marginTop: 8 },
  primary: {
    marginTop: 12,
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirm: {
    backgroundColor: '#1e88e5',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.5 },
  linkBtn: { marginTop: 10, alignItems: 'center' },
  link: { color: '#666' },
  previewBox: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    maxHeight: 180,
  },
  previewTitle: { fontWeight: '700', marginBottom: 6, color: '#333' },
  blockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  blockTitle: { color: '#333' },
  blockMinutes: { color: '#555' },
});
