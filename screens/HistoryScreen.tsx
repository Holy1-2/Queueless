import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography } from '../theme/colors';
import { 
  ClockIcon, 
  CalendarIcon, 
  CheckIcon, 
  ArrowRightIcon,
  ChevronDownIcon,
  StarIcon,
} from '../components/Icons';
import { getFontFamily } from '../theme/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.85;
const BOTTOM_SHEET_MIN_HEIGHT = 100;

interface HistoryScreenProps {
  navigation: any;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const bottomSheetHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [BOTTOM_SHEET_MIN_HEIGHT, BOTTOM_SHEET_MAX_HEIGHT],
  });

  const [historyData] = useState({
    stats: {
      totalVisits: 42,
      averageWait: '18 min',
      averageRating: 4.5,
      savedTime: '15.2 hrs',
    },
    sections: [
      {
        id: '1',
        title: 'Today',
        data: [
          {
            id: '1-1',
            type: 'General Consultation',
            doctor: 'Dr. Sarah Miller',
            time: '10:30 AM',
            date: 'Dec 29',
            duration: '45 min',
            status: 'completed',
            number: 'P023',
            rating: 5,
            location: 'Main Hospital, Level 3',
            department: 'Internal Medicine',
            notes: 'Regular checkup, all vitals normal',
          },
          {
            id: '1-2',
            type: 'Lab Tests',
            doctor: 'Lab Technician',
            time: '2:15 PM',
            date: 'Dec 29',
            duration: '30 min',
            status: 'upcoming',
            number: 'L042',
            rating: null,
            location: 'Lab Wing, Level 1',
            department: 'Pathology',
            notes: 'Blood work and urine analysis',
          },
        ],
      },
      {
        id: '2',
        title: 'Yesterday',
        data: [
          {
            id: '2-1',
            type: 'Pharmacy Pickup',
            doctor: 'Pharmacist',
            time: '11:00 AM',
            date: 'Dec 28',
            duration: '15 min',
            status: 'completed',
            number: 'M087',
            rating: 4,
            location: 'Pharmacy, Ground Floor',
            department: 'Pharmacy',
            notes: 'Antibiotics and pain relief',
          },
        ],
      },
      {
        id: '3',
        title: 'Last Week',
        data: [
          {
            id: '3-1',
            type: 'Dental Checkup',
            doctor: 'Dr. James Wilson',
            time: '9:00 AM',
            date: 'Dec 22',
            duration: '1 hour',
            status: 'completed',
            number: 'D012',
            rating: 5,
            location: 'Dental Clinic, Level 2',
            department: 'Dentistry',
            notes: 'Teeth cleaning and cavity check',
          },
          {
            id: '3-2',
            type: 'Eye Examination',
            doctor: 'Dr. Emily Chen',
            time: '3:30 PM',
            date: 'Dec 21',
            duration: '40 min',
            status: 'completed',
            number: 'E025',
            rating: 4,
            location: 'Eye Center, Level 4',
            department: 'Ophthalmology',
            notes: 'Vision test and prescription update',
          },
        ],
      },
    ],
  });

  const openDetailSheet = (item: any) => {
    setSelectedVisit(item);
    setIsDetailOpen(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: false,
      tension: 50,
      friction: 12,
    }).start();
  };

  const closeDetailSheet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: false,
      tension: 50,
      friction: 12,
    }).start(() => {
      setIsDetailOpen(false);
      setSelectedVisit(null);
    });
  };

  const renderStatsCard = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Your Activity</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{historyData.stats.totalVisits}</Text>
          <Text style={styles.statLabel}>Total Visits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{historyData.stats.averageWait}</Text>
          <Text style={styles.statLabel}>Avg. Wait</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.ratingContainer}>
            <StarIcon size={14} color={Colors.warning} />
            <Text style={styles.statValue}>{historyData.stats.averageRating}</Text>
          </View>
          <Text style={styles.statLabel}>Avg. Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{historyData.stats.savedTime}</Text>
          <Text style={styles.statLabel}>Time Saved</Text>
        </View>
      </View>
    </View>
  );

  const renderHistoryCard = (item: any) => (
    <TouchableOpacity 
      style={styles.historyCard}
      onPress={() => openDetailSheet(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.serviceInfo}>
          <View style={[
            styles.serviceIcon,
            { backgroundColor: getServiceColor(item.type).bg }
          ]}>
            <Text style={[
              styles.serviceInitial,
              { color: getServiceColor(item.type).text }
            ]}>
              {item.type.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.serviceType}>{item.type}</Text>
            <Text style={styles.serviceDoctor}>{item.doctor}</Text>
          </View>
        </View>
        <View style={[
          styles.statusPill,
          { backgroundColor: getStatusColor(item.status).bg }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status).text }
          ]}>
            {item.status === 'completed' ? 'Done' : 'Upcoming'}
          </Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <ClockIcon size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <CalendarIcon size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.queueInfo}>
          <Text style={styles.queueLabel}>Queue #</Text>
          <Text style={styles.queueNumber}>{item.number}</Text>
        </View>
      </View>

      {item.rating && (
        <View style={styles.cardFooter}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                size={12} 
                color={i < item.rating ? Colors.warning : Colors.border} 
              />
            ))}
          </View>
          <ArrowRightIcon size={16} color={Colors.textTertiary} />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderDetailSheet = () => (
    <Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
      {/* Handle */}
      <View style={styles.sheetHandle}>
        <View style={styles.handleBar} />
      </View>

      {selectedVisit && (
        <View style={styles.detailContent}>
          <View style={styles.detailHeader}>
            <View style={styles.detailService}>
              <View style={[
                styles.detailIcon,
                { backgroundColor: getServiceColor(selectedVisit.type).bg }
              ]}>
                <Text style={[
                  styles.detailIconText,
                  { color: getServiceColor(selectedVisit.type).text }
                ]}>
                  {selectedVisit.type.charAt(0)}
                </Text>
              </View>
              <View>
                <Text style={styles.detailTitle}>{selectedVisit.type}</Text>
                <Text style={styles.detailSubtitle}>{selectedVisit.doctor}</Text>
              </View>
            </View>
            <View style={[
              styles.detailStatus,
              { backgroundColor: getStatusColor(selectedVisit.status).bg + '20' }
            ]}>
              <Text style={[
                styles.detailStatusText,
                { color: getStatusColor(selectedVisit.status).text }
              ]}>
                {selectedVisit.status === 'completed' ? 'Completed' : 'Scheduled'}
              </Text>
            </View>
          </View>

          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{selectedVisit.date} • {selectedVisit.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{selectedVisit.duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Queue Number</Text>
              <Text style={[styles.detailValue, styles.queueHighlight]}>{selectedVisit.number}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{selectedVisit.location}</Text>
            </View>
          </View>

          {selectedVisit.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>Notes</Text>
              <Text style={styles.notesText}>{selectedVisit.notes}</Text>
            </View>
          )}

          {selectedVisit.rating && (
            <View style={styles.ratingSection}>
              <Text style={styles.ratingTitle}>Your Rating</Text>
              <View style={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    size={20} 
                    color={i < selectedVisit.rating ? Colors.warning : Colors.border} 
                  />
                ))}
                <Text style={styles.ratingValue}>{selectedVisit.rating}/5</Text>
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={closeDetailSheet}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );

  const renderSection = ({ item: section }: { item: any }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((item: any) => (
        <View key={item.id} style={styles.cardWrapper}>
          {renderHistoryCard(item)}
        </View>
      ))}
    </View>
  );

  // Helper functions
  const getServiceColor = (type: string) => {
    const colors: any = {
      'General Consultation': { bg: '#007AFF20', text: '#007AFF' },
      'Lab Tests': { bg: '#34C75920', text: '#34C759' },
      'Pharmacy Pickup': { bg: '#AF52DE20', text: '#AF52DE' },
      'Dental Checkup': { bg: '#FF950020', text: '#FF9500' },
      'Eye Examination': { bg: '#5856D620', text: '#5856D6' },
    };
    return colors[type] || { bg: '#8E8E9320', text: '#8E8E93' };
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' 
      ? { bg: '#34C759', text: '#34C759' }
      : { bg: '#FF9500', text: '#FF9500' };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.goBack();
            }}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>History</Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={historyData.sections}
        keyExtractor={(item) => item.id}
        renderItem={renderSection}
        ListHeaderComponent={renderStatsCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {/* Bottom Sheet Overlay */}
      {isDetailOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDetailSheet}
        />
      )}

      {/* Bottom Sheet */}
      {renderDetailSheet()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: Colors.text,
    fontFamily: getFontFamily('regular'),
  },
  headerTitle: {
    ...Typography.title2,
    color: Colors.text,
    fontFamily: getFontFamily('semibold'),
  },
  headerRight: {
    width: 40,
  },
  statsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  statsTitle: {
    ...Typography.title3,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontFamily: getFontFamily('semibold'),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    ...Typography.title2,
    color: Colors.text,
    marginBottom: Spacing.xs,
    fontFamily: getFontFamily('semibold'),
  },
  statLabel: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    fontFamily: getFontFamily('regular'),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: BOTTOM_SHEET_MIN_HEIGHT + 20,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.headline,
    color: Colors.text,
    marginBottom: Spacing.md,
    fontFamily: getFontFamily('semibold'),
  },
  cardWrapper: {
    marginBottom: Spacing.md,
  },
  historyCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  serviceInitial: {
    ...Typography.title3,
    fontFamily: getFontFamily('semibold'),
  },
  serviceType: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: 2,
    fontFamily: getFontFamily('medium'),
  },
  serviceDoctor: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    fontFamily: getFontFamily('regular'),
  },
  statusPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    ...Typography.caption2,
    fontFamily: getFontFamily('medium'),
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    fontFamily: getFontFamily('regular'),
  },
  queueInfo: {
    alignItems: 'flex-end',
  },
  queueLabel: {
    ...Typography.caption2,
    color: Colors.textSecondary,
    fontFamily: getFontFamily('regular'),
  },
  queueNumber: {
    ...Typography.headline,
    color: Colors.primary,
    fontFamily: getFontFamily('semibold'),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'hidden',
  },
  sheetHandle: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: Colors.separator,
    borderRadius: 2,
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  detailService: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  detailIconText: {
    ...Typography.title2,
    fontFamily: getFontFamily('semibold'),
  },
  detailTitle: {
    ...Typography.title3,
    color: Colors.text,
    marginBottom: 2,
    fontFamily: getFontFamily('semibold'),
  },
  detailSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontFamily: getFontFamily('regular'),
  },
  detailStatus: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  detailStatusText: {
    ...Typography.footnote,
    fontFamily: getFontFamily('medium'),
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  detailItem: {
    width: '47%',
  },
  detailLabel: {
    ...Typography.footnote,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontFamily: getFontFamily('regular'),
  },
  detailValue: {
    ...Typography.body,
    color: Colors.text,
    fontFamily: getFontFamily('medium'),
  },
  queueHighlight: {
    color: Colors.primary,
  },
  notesSection: {
    marginBottom: Spacing.xl,
  },
  notesTitle: {
    ...Typography.headline,
    color: Colors.text,
    marginBottom: Spacing.sm,
    fontFamily: getFontFamily('semibold'),
  },
  notesText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontFamily: getFontFamily('regular'),
  },
  ratingSection: {
    marginBottom: Spacing.xl,
  },
  ratingTitle: {
    ...Typography.headline,
    color: Colors.text,
    marginBottom: Spacing.sm,
    fontFamily: getFontFamily('semibold'),
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  ratingValue: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
    fontFamily: getFontFamily('medium'),
  },
  closeButton: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: Spacing.lg,
    borderRadius: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    ...Typography.headline,
    color: Colors.primary,
    fontFamily: getFontFamily('semibold'),
  },
});

export default HistoryScreen;