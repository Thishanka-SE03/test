import React from 'react';
import {View,Text,SafeAreaView,ScrollView,TouchableOpacity,Platform,} from 'react-native-web';
import { Leaf, Star, Gift } from 'lucide-react';
import { styles, responsiveHelpers, cardWidth } from './styles/styles';
import { categories, membershipLevels, pointsData } from './constants/data';

const { isWeb, isSmallDevice } = responsiveHelpers;
const { currentPoints, targetPoints, progress } = pointsData;

const Redeem = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && { maxWidth: 'auto', marginHorizontal: 'auto' },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My EcoPoints</Text>
          <Text style={styles.subtitle}>Earn rewards for saving the planet</Text>
        </View>

        {/* Main Points Card */}
        <View style={[styles.mainCard, isWeb && styles.mainCardWeb]}>
          <View style={styles.thanksRow}>
            <Text style={styles.thanksText}>
              Thank you for recycling! Every point counts.
            </Text>
          </View>

          <Text style={styles.currentTier}>PLATINUM MEMBER</Text>

          {/* Tier Levels */}
          <View style={styles.levelsContainer}>
            {membershipLevels.map((level, i) => (
              <View key={i} style={styles.levelItem}>
                <Text
                  style={[
                    styles.levelText,
                    level.active && styles.activeLevelText,
                  ]}
                >
                  {level.name}
                </Text>
                {level.active && <View style={styles.activeDot} />}
              </View>
            ))}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>{currentPoints.toFixed(0)}</Text>
              <Text style={styles.progressText}>{targetPoints}</Text>
            </View>
          </View>

          <Text style={styles.nextTierText}>
            <Text style={styles.bold}>
              {(targetPoints - currentPoints).toFixed(0)}
            </Text>{' '}
            more points to <Text style={styles.bold}>Diamond</Text> tier!
          </Text>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Expires</Text>
              <Text style={styles.infoValue}>31 Jan 2026</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Available Points</Text>
              <Text style={styles.balanceText}>{currentPoints.toFixed(0)}</Text>
            </View>
          </View>
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>
            <Gift color="#166534" size={isSmallDevice ? 20 : 24} />
            {'  '}Redeem Your EcoPoints
          </Text>

          <View style={styles.grid}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.rewardCard, { width: cardWidth }]}
                activeOpacity={0.8}
              >
                <View style={styles.rewardTop}>
                  <Text style={styles.rewardCategoryBadge}>{item.category}</Text>
                  <Text style={styles.discountText}>{item.off}</Text>
                </View>
                <Text style={styles.rewardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.pointsBadge}>
                  <Leaf color="#166534" size={16} />
                  <Text style={styles.pointsText}>{item.points} POINTS</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Redeem;