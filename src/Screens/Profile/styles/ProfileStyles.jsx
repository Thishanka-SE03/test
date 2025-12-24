import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  scrollContent: {
    padding: 14,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 20,
    backgroundColor: '#15803d', // Deep green header gradient base
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    color: '#dcfce7',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
  },

  photoContainer: {
    alignItems: 'center',
    marginTop: -60, // Overlap header for modern floating effect
    marginBottom: 30,
  },
  photoWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: '#86efac', // Light green glow
    shadowColor: '#16a34a',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  actionButtonsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  editActions: {
    flexDirection: 'row',
    gap: 16,
  },
  cancelButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#dc2626',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#16a34a',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  editProfileButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#16a34a',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  formCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#15803d',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 17,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    fontSize: 17,
  },
  inputEditing: {
    borderColor: '#86efac',
    backgroundColor: '#f0fdfa',
  },
  inputReadonly: {
    borderColor: '#bbf7d0',
    backgroundColor: '#f8fffb',
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#15803d',
    marginBottom: 24,
    textAlign: 'center',
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: '#ecfdf5',
    padding: 24,
    borderRadius: 24,
    flex: 1,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#15803d',
    marginTop: 12,
  },
  statLabel: {
    color: '#4b5563',
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
  },
  icon: {
    color: '#16a34a',
  },

  logoutButton: {
    marginTop: 20,
    backgroundColor: '#fee2e2',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 17,
  },
});