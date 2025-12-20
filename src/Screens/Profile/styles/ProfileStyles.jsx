import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdf6',
  },
  scrollContent: {
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#166534',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 8,
    fontSize: 16,
  },

  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#86efac',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
  },

  actionButtonsContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  saveButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editProfileButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },

  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#166534',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  inputEditing: {
    borderColor: '#86efac',
    backgroundColor: '#fafffd',
  },
  inputReadonly: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 20,
    textAlign: 'center',
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ecfdf5',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    minWidth: 150,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#166534',
    marginTop: 8,
  },
  statLabel: {
    color: '#4b5563',
    marginTop: 4,
    fontSize: 14,
  },

  logoutButton: {
    marginTop: 40,
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 16,
  },
});