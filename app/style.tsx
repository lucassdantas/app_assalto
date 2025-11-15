
import { colors } from '@/app/theme/colors';
import { fontsFamilies, fontSizes } from '@/app/theme/fonts';
import { spacing } from '@/app/theme/spacing';
import { StyleSheet } from 'react-native';


module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
  },

  header: {
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginBottom: spacing.lg,
    elevation: 2,
  },

  iconRight: {
    marginHorizontal: 6,
  },

  input: {
    flex: 1,
    fontFamily: fontsFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },

  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: '100%',
    height: 160,
  },

  postContent: {
    padding: spacing.md,
  },

  postTitle: {
    fontSize: 18,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
  },

  postAddress: {
    fontSize: 14,
    fontFamily: fontsFamilies.medium,
    color: colors.textSecondary,
    marginTop: 4,
  },

  postDescription: {
    fontSize: 14,
    fontFamily: fontsFamilies.regular,
    color: colors.textPrimary,
    marginTop: 6,
  },
   map: {
    flex: 1,
  },
  // Adicione dentro do seu StyleSheet existente:

label: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 6,
  color: '#222',
},

inputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  paddingHorizontal: 12,
  borderRadius: 8,
  height: 45,
  marginBottom: 16,
},


selectBox: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  paddingHorizontal: 12,
  borderRadius: 8,
  height: 45,
  marginBottom: 8,
},

dropdown: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 16,
},

dropdownItem: {
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  fontSize: 16,
},

imageButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#d32f2f',
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 8,
},

imageButtonText: {
  color: '#fff',
  marginLeft: 6,
  fontWeight: '600',
},

textArea: {
  backgroundColor: '#f2f2f2',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  minHeight: 120,
  textAlignVertical: 'top',
  marginBottom: 20,
},

submitButton: {
  backgroundColor: '#d32f2f',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},

submitButtonText: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
},

});
