import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native-web";
import { Leaf, Recycle, MapPin, ArrowRight } from "lucide-react"; // Use lucide-react-native for RN
import { styles } from "./styles/HomeStyles";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Turn Waste into Hope</Text>
            <Text style={styles.heroSubtitle}>
              EcoSphere makes recycling easy, rewarding, and impactful. Join
              thousands who are building a cleaner planet — one bottle at a
              time.
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Find Recycling Point</Text>
                <ArrowRight color="white" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>
                  Learn How It Works
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Our Impact So Far</Text>
            <View style={styles.statsGrid}>
              {[
                { value: "127K+", label: "Kg Recycled" },
                { value: "8,400+", label: "Active Users" },
                { value: "312", label: "Collection Points" },
                { value: "94%", label: "User Satisfaction" },
              ].map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>How EcoSphere Works</Text>
            <Text style={styles.sectionSubtitle}>
              Simple steps to make a big difference
            </Text>

            <View style={styles.featuresGrid}>
              {[
                {
                  icon: <MapPin color="#166534" size={40} />,
                  title: "1. Find Nearby Points",
                  desc: "Locate verified recycling centers near you instantly",
                },
                {
                  icon: <Recycle color="#166534" size={40} />,
                  title: "2. Drop Off Recyclables",
                  desc: "Bring plastics, paper, glass, and electronics",
                },
                {
                  icon: <Leaf color="#166534" size={40} />,
                  title: "3. Earn Green Points",
                  desc: "Get rewards and track your positive impact",
                },
              ].map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <View style={styles.iconCircle}>{feature.icon}</View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Final CTA */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Ready to Make a Difference?</Text>
            <Text style={styles.ctaSubtitle}>
              Join the EcoSphere community today and start your recycling
              journey.
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Download EcoSphere App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
