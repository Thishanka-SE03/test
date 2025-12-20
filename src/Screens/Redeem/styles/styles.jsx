import { text } from 'framer-motion/client';
import { StyleSheet, Dimensions, Platform } from 'react-native-web';

const { width } = Dimensions.get('window');

// Responsive helpers
const isWeb = Platform.OS === 'web';
const isSmallDevice = width < 375;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

const columns = isDesktop ? 4 : isTablet ? 3 : 2;
export const cardWidth = isWeb
  ? Math.min((width - 80) / columns - 20, 300)
  : (width - 60) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdf6',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: isSmallDevice ? 20 : 28,
    paddingTop: 20,
    backgroundColor: '#0a5f38',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 28 : 34,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isSmallDevice ? 16 : 18,
    color: '#d1fae5',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  mainCard: {
    marginHorizontal: 20,
    marginTop: -20,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 16,
  },
  mainCardWeb: {
    marginTop: 40,
    maxWidth: 600,
    alignSelf: 'center',
  },
  thanksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  thanksText: {
    fontSize: isSmallDevice ? 16 : 18,
    color: '#166534',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginLeft: 10,
  },
  currentTier: {
    fontSize: isSmallDevice ? 26 : 30,
    fontWeight: 'bold',
    color: '#166534',
    textAlign: 'center',
    marginBottom: 20,
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  levelItem: { alignItems: 'center' },
  levelText: {
    fontSize: isSmallDevice ? 12 : 14,
    color: '#9ca3af',
    fontWeight: '600',
  },
  activeLevelText: {
    color: '#166534',
    fontWeight: 'bold',
    fontSize: isSmallDevice ? 14 : 16,
  },
  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#16a34a',
    marginTop: 6,
  },
  progressContainer: { marginVertical: 20 },
  progressBackground: {
    height: 14,
    backgroundColor: '#ecfdf5',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  nextTierText: {
    textAlign: 'center',
    fontSize: isSmallDevice ? 15 : 17,
    color: '#166534',
    marginTop: 12,
  },
  bold: { fontWeight: 'bold', color: '#15803d' },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0fdf4',
  },
  infoItem: { alignItems: 'center' },
  infoLabel: { fontSize: 13, color: '#6b7280' },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: '#166534', marginTop: 4 },
  balanceText: { fontSize: 28, fontWeight: 'bold', color: '#16a34a' },
  rewardsSection: {
    paddingHorizontal: isWeb ? 20 : 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 10 : 24,
    fontWeight: 'bold',
    color: '#166534',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: isWeb ? 20 : 16,
    paddingHorizontal: 4,
  },
  rewardCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: '#86efac',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  rewardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rewardCategoryBadge: {
    fontSize: 10,
    color: '#166534',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: '700',
  },
  discountText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 12,
    minHeight: 44,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#86efac',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#166534',
    marginLeft: 6,
  },
});

// Export responsive helpers for use in components
export const responsiveHelpers = {
  isWeb,
  isSmallDevice,
  isTablet,
  isDesktop,
  columns,
};