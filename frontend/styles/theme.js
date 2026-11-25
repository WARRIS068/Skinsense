import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#2E7D6B',
  background: '#F5F7F6',
  card: '#FFFFFF',
  text: '#1F2933',
  grey: '#6B7280',
  border: '#E5E7EB',
};

export function severityColor(level) {
  if (level === 'none') {
    return '#16A34A';
  }
  if (level === 'mild') {
    return '#CA8A04';
  }
  if (level === 'moderate') {
    return '#EA580C';
  }
  return '#DC2626';
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  greyText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  smallGrey: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 10,
  },
  photo: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 14,
  },
  photoPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#A7C4BC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkBox: {
    fontSize: 26,
    color: COLORS.primary,
    marginRight: 10,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  message: {
    color: '#B91C1C',
    marginTop: 14,
    textAlign: 'center',
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  scoreOutOf: {
    fontSize: 20,
    color: COLORS.grey,
  },
  barBackground: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 5,
    marginTop: 10,
  },
  barFill: {
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  badge: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  summary: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    marginTop: 14,
  },
  warning: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 14,
    backgroundColor: '#fdecea',
    color: '#b71c1c',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  ingredientBlock: {
    marginBottom: 10,
  },
  ingredientConcern: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  disclaimer: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 16,
  },
});