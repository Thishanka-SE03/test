import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
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
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchCitizenAddress, updateUserProfile } from "./Service/profileUtils";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [tempUsername, setTempUsername] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [tempPhotoFile, setTempPhotoFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);

        setUsername(user.username || "");
        setEmail(user.email || "");
        setProfilePhoto(user.userphotopath || null);
        setOriginalPhoto(user.userphotopath || null);

        const citizenAddr = await fetchCitizenAddress(user.id);
        setAddress(citizenAddr);

        setTempUsername(user.username || "");
        setTempEmail(user.email || "");
        setTempAddress(citizenAddr);
      } catch {
        window.alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, navigate]);

  const handlePhotoChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setTempPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePhoto(ev.target.result);
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newPhotoUrl = await updateUserProfile({
        userId: user.id,
        username: tempUsername,
        email: tempEmail,
        address: tempAddress,
        photoFile: tempPhotoFile,
        currentPhotoPath: originalPhoto,
      });

      setUsername(tempUsername);
      setEmail(tempEmail);
      setAddress(tempAddress);
      setProfilePhoto(newPhotoUrl);
      setOriginalPhoto(newPhotoUrl);
      setTempPhotoFile(null);
      setIsEditing(false);

      window.alert("Profile updated successfully");
    } catch (err) {
      window.alert(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempUsername(username);
    setTempEmail(email);
    setTempAddress(address);
    setProfilePhoto(originalPhoto);
    setTempPhotoFile(null);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      window.alert("Failed to log out");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#16a34a" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>Manage your account</Text>
        </View>

        <View style={styles.photoContainer}>
          <View style={styles.photoWrapper}>
            <Image
              source={{
                uri: profilePhoto || "https://via.placeholder.com/120",
              }}
              style={styles.profileImage}
            />
            {isEditing && (
              <TouchableOpacity
                onPress={handlePhotoChange}
                style={styles.cameraButton}
              >
                <Camera color="white" size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          {isEditing ? (
            <View style={styles.editActions}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}
                disabled={saving}
              >
                <X color="white" size={18} />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                style={styles.saveButton}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator size={18} color="white" />
                ) : (
                  <Check color="white" size={18} />
                )}
                <Text style={styles.buttonText}>Save</Text>
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

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={isEditing ? tempUsername : username}
              onChange={(e) => setTempUsername(e.target.value)}
              editable={isEditing}
              style={[
                styles.input,
                isEditing ? styles.inputEditing : styles.inputReadonly,
              ]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={isEditing ? tempEmail : email}
              onChange={(e) => setTempEmail(e.target.value)}
              editable={isEditing}
              style={[
                styles.input,
                isEditing ? styles.inputEditing : styles.inputReadonly,
              ]}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin size={16} />
              <Text style={styles.label}> Address</Text>
            </View>
            <TextInput
              value={isEditing ? tempAddress : address}
              onChange={(e) => setTempAddress(e.target.value)}
              editable={isEditing}
              style={[
                styles.input,
                isEditing ? styles.inputEditing : styles.inputReadonly,
              ]}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Eco Impact</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Recycle size={32} />
            <Text style={styles.statValue}>842</Text>
            <Text style={styles.statLabel}>Kg Recycled</Text>
          </View>
          <View style={styles.statCard}>
            <Leaf size={32} />
            <Text style={styles.statValue}>67</Text>
            <Text style={styles.statLabel}>Trees Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy size={32} />
            <Text style={styles.statValue}>Top 5%</Text>
            <Text style={styles.statLabel}>Leaderboard</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
