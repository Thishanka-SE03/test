import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdf6',
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero Section
  hero: {
    backgroundColor: '#0a5f38',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  heroContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#e0f2e9',
    marginBottom: 32,
    lineHeight: 30,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  // Stats Section
  statsSection: {
    paddingVertical: 80,
    backgroundColor: '#ecfdf5',
  },
  sectionWrapper: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 48,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  statLabel: {
    fontSize: 18,
    color: '#4b5563',
  },

  // Features Section
  featuresSection: {
    paddingVertical: 100,
    backgroundColor: 'white',
  },
  sectionSubtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 60,
    maxWidth: 700,
    marginHorizontal: 'auto',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
  },
  featureCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#f0fdf4',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconCircle: {
    backgroundColor: '#86efac',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 12,
  },
  featureDesc: {
    color: '#4b5563',
    fontSize: 16,
  },

  // Final CTA
  ctaSection: {
    backgroundColor: '#166534',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  ctaContent: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  ctaSubtitle: {
    fontSize: 20,
    color: '#d1fae5',
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 50,
    alignSelf: 'center',
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});