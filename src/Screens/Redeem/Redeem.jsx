import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native-web';
import { Leaf, Gift } from 'lucide-react';
import { styles, responsiveHelpers } from './styles/styles';
import { supabase } from '../../lib/supabaseClient';

const { isWeb, isSmallDevice } = responsiveHelpers;

// Hard-coded rewards (you can move these to DB later if needed)
const rewards = [
  { title: 'THE PALMS', points: 100, off: '30%', category: 'Loyalty' },
  { title: 'Tranquilisle', points: 200, off: '20%', category: 'Loyalty' },
  { title: 'Beauty & Wellness', points: 150, off: '15%', category: 'Beauty & Wellness' },
  { title: 'Clothing & Accessories', points: 150, off: '15%', category: 'Clothing' },
  { title: 'Dining', points: 100, off: '40%', category: 'Dining' },
  { title: 'Eco Store', points: 80, off: '10%', category: 'Sustainability' },
  { title: 'Green Cafe', points: 120, off: '12%', category: 'Dining' },
  { title: 'Plant Shop', points: 90, off: '30%', category: 'Gardening' },
];

const tiers = [
  { name: 'SILVER', minPoints: 0, accentColor: '#AAA9AD' },
  { name: 'GOLD', minPoints: 1000, accentColor: '#D4AF37' },
  { name: 'PLATINUM', minPoints: 2000, accentColor: '#4682B4' },
  { name: 'DIAMOND', minPoints: 4000, accentColor: '#50C878' },
];

const Redeem = () => {
  const [currentPoints, setCurrentPoints] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's points on mount
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
          .from('citizen')
          .select('totalpoints')
          .eq('citizenid', user.id)
          .single();

        if (error) throw error;

        setCurrentPoints(data.totalpoints || 0);
      } catch (err) {
        console.error('Error fetching points:', err);
        setError(err.message);
        Alert.alert('Error', 'Failed to load your points. Please try again.');
        setCurrentPoints(0); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  // Calculate tier info
  const {
    currentTierName,
    nextTier,
    pointsNeeded,
    accentColor,
    textColor,
  } = useMemo(() => {
    if (currentPoints === null) {
      return {
        currentTierName: 'SILVER',
        nextTier: 'GOLD',
        pointsNeeded: 1000,
        accentColor: '#AAA9AD',
        textColor: '#333333',
      };
    }

    let current = tiers[0];
    let next = null;
    let needed = 0;

    for (let i = tiers.length - 1; i >= 0; i--) {
      if (currentPoints >= tiers[i].minPoints) {
        current = tiers[i];
        if (i < tiers.length - 1) {
          next = tiers[i + 1];
          needed = next.minPoints - currentPoints;
        }
        break;
      }
    }

    return {
      currentTierName: current.name,
      nextTier: next ? next.name : null,
      pointsNeeded: needed,
      accentColor: current.accentColor,
      textColor: '#333333',
    };
  }, [currentPoints]);

  const progress = currentPoints !== null
    ? (currentPoints / tiers[tiers.length - 1].minPoints) * 100
    : 0;

  // Handle redemption with DB update
  const handleRedeem = async (item) => {
    if (currentPoints < item.points) {
      Alert.alert(
        'Insufficient Points',
        `You need ${item.points} points to redeem "${item.title}".\nYou have ${currentPoints} points.`
      );
      return;
    }

    // Optimistic UI update
    const newPoints = currentPoints - item.points;
    setCurrentPoints(newPoints);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('citizen')
        .update({ totalpoints: newPoints })
        .eq('citizenid', user.id);

      if (error) throw error;

      Alert.alert(
        'Redeemed Successfully! ✨',
        `"${item.title}" redeemed for ${item.points} points!\nRemaining: ${newPoints} points`
      );
    } catch (err) {
      console.error('Redemption failed:', err);
      // Revert on failure
      setCurrentPoints(currentPoints);
      Alert.alert('Redemption Failed', 'Could not update points. Please try again.');
    }
  };

  const dynamicStyles = {
    currentTierText: { color: accentColor },
    thanksText: { color: textColor },
    nextTierText: { color: textColor },
    boldText: { color: accentColor },
    progressFill: { backgroundColor: accentColor },
    pointsText: { color: accentColor },
    balanceText: { color: accentColor },
    activeLevelText: { color: accentColor },
    activeDot: { backgroundColor: accentColor },
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading your rewards...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>My Rewards</Text>
          <Text style={styles.subtitle}>Exclusive membership benefits</Text>
        </View>

        {/* Main Card */}
        <View style={[styles.mainCard, isWeb && styles.mainCardWeb]}>
          <View style={styles.thanksRow}>
            <Text style={[styles.thanksText, dynamicStyles.thanksText]}>
              Welcome back, valued member
            </Text>
          </View>

          <Text style={[styles.currentTier, dynamicStyles.currentTierText]}>
            {currentTierName.toUpperCase()} MEMBER
          </Text>

          <View style={styles.levelsContainer}>
            {tiers.map((tier) => (
              <View key={tier.name} style={styles.levelItem}>
                <Text
                  style={[
                    styles.levelText,
                    currentTierName === tier.name && [styles.activeLevelText, dynamicStyles.activeLevelText],
                  ]}
                >
                  {tier.name}
                </Text>
                {currentTierName === tier.name && (
                  <View style={[styles.activeDot, dynamicStyles.activeDot]} />
                )}
              </View>
            ))}
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[styles.progressFill, dynamicStyles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>{currentPoints ?? 0}</Text>
              <Text style={styles.progressText}>{tiers[tiers.length - 1].minPoints}</Text>
            </View>
          </View>

          {nextTier ? (
            <Text style={[styles.nextTierText, dynamicStyles.nextTierText]}>
              <Text style={dynamicStyles.boldText}>{pointsNeeded}</Text> more points to{' '}
              <Text style={dynamicStyles.boldText}>{nextTier}</Text> tier!
            </Text>
          ) : (
            <Text style={[styles.nextTierText, dynamicStyles.nextTierText]}>
              <Text style={dynamicStyles.boldText}>Congratulations!</Text> You've reached Diamond ✨
            </Text>
          )}

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Expires</Text>
              <Text style={styles.infoValue}>31 Jan 2026</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Available Points</Text>
              <Text style={[styles.balanceText, dynamicStyles.balanceText]}>
                {currentPoints ?? 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>
            <Gift color={accentColor} size={isSmallDevice ? 20 : 24} />
            {'  '}Redeem Exclusive Rewards
          </Text>

          <View style={styles.grid}>
            {rewards.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.rewardCard,
                  currentPoints < item.points && styles.disabledCard,
                ]}
                activeOpacity={0.8}
                onPress={() => handleRedeem(item)}
                disabled={currentPoints < item.points}
              >
                <View style={styles.rewardTop}>
                  <Text style={styles.rewardCategoryBadge}>{item.category}</Text>
                  <Text style={styles.discountText}>{item.off}</Text>
                </View>
                <Text style={styles.rewardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.pointsBadge}>
                  <Leaf color={accentColor} size={16} />
                  <Text style={[styles.pointsText, dynamicStyles.pointsText]}>
                    {item.points} POINTS
                  </Text>
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