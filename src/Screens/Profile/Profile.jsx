import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native-web";
import {
  Camera,
  MapPin,
  Edit2,
  Check,
  X,
  Leaf,
  Recycle,
  Trophy,
} from "lucide-react";
import { styles } from "./styles/ProfileStyles";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempAddress, setTempAddress] = useState(address);

  const navigation = useNavigation();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  const handleSave = () => {
    setUsername(tempUsername);
    setEmail(tempEmail);
    setAddress(tempAddress);
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancel = () => {
    setTempUsername(username);
    setTempEmail(email);
    setTempAddress(address);
    setIsEditing(false);
  };

  const handlePhotoChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // Remove capture to allow choosing camera OR gallery (best UX)

    input.onchange = (e) => {
      const file = e.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setProfilePhoto(ev.target?.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // Trigger click on the hidden input
    input.click();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account and view your impact
          </Text>
        </View>

        {/* Profile Photo */}
        <View style={styles.photoContainer}>
          <View style={styles.photoWrapper}>
            <Image
              source={{
                uri:
                  profilePhoto || "https://via.placeholder.com/120?text=User",
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              onPress={handlePhotoChange}
              style={styles.cameraButton}
            >
              <Camera color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Edit/Save Buttons */}
        <View style={styles.actionButtonsContainer}>
          {isEditing ? (
            <View style={styles.editActions}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}
              >
                <X color="white" size={18} />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Check color="white" size={18} />
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.editProfileButton}
            >
              <Edit2 color="white" size={18} />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={isEditing ? tempUsername : username}
              onChangeText={setTempUsername}
              editable={isEditing}
              style={[
                styles.input,
                isEditing ? styles.inputEditing : styles.inputReadonly,
              ]}
              placeholder="Enter username"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={isEditing ? tempEmail : email}
              onChangeText={setTempEmail}
              editable={isEditing}
              keyboardType="email-address"
              style={[
                styles.input,
                isEditing ? styles.inputEditing : styles.inputReadonly,
              ]}
              placeholder="your@email.com"
            />
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MapPin size={16} style={{ display: "inline" }} />{" "}
              Delivery/Collection Address
            </Text>
            <TextInput
              value={isEditing ? tempAddress : address}
              onChangeText={setTempAddress}
              editable={isEditing}
              style={[
                styles.input,
                isEditing ? styles.inputEditing : styles.inputReadonly,
              ]}
              placeholder="Your home or pickup address"
            />
          </View>
        </View>

        {/* Eco Stats Title */}
        <Text style={styles.sectionTitle}>Your Eco Impact</Text>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Recycle color="#16a34a" size={32} />
            <Text style={styles.statValue}>842</Text>
            <Text style={styles.statLabel}>Kg Recycled</Text>
          </View>

          <View style={styles.statCard}>
            <Leaf color="#16a34a" size={32} />
            <Text style={styles.statValue}>67</Text>
            <Text style={styles.statLabel}>Trees Saved</Text>
          </View>

          <View style={styles.statCard}>
            <Trophy color="#16a34a" size={32} />
            <Text style={styles.statValue}>Top 5%</Text>
            <Text style={styles.statLabel}>Eco Leaderboard</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
