import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16, // Optional: Add padding bottom as needed
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bannerListContainer: {
    height: "100%",
    paddingVertical: 16,
  },
  bannerList: {
    maxHeight: "15%",
  },
  card: {
    marginTop: 1,
  },
  infoButtonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  infoButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20
  },
  infoButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
  },
  infoCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLeftColumn: {
    flex: 1,
    marginRight: 16,
  },
  infoRightColumn: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    marginBottom: 4,
  },
  submittedContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});
