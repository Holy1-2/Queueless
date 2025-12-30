import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';
import { DoctorIcon, EmergencyIcon, PharmacyIcon, LabIcon } from './Icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 80;

interface CarouselProps {
  onItemPress: (item: any) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onItemPress }) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      id: '1',
      title: 'Emergency Care',
      description: 'Immediate medical attention',
      icon: <EmergencyIcon size={32} color={Colors.text} />,
      color: Colors.error,
    },
    {
      id: '2',
      title: 'Specialist Consultation',
      description: 'Book with top specialists',
      icon: <DoctorIcon size={32} color={Colors.text} />,
      color: Colors.primary,
    },
    {
      id: '3',
      title: 'Pharmacy Services',
      description: 'Prescription & OTC medicines',
      icon: <PharmacyIcon size={32} color={Colors.text} />,
      color: Colors.success,
    },
  ];

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.carouselItem,
        { backgroundColor: item.color + '20', borderColor: item.color + '40' },
      ]}
      onPress={() => onItemPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.itemContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '40' }]}>
          {item.icon}
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={[styles.bookButtonText, { color: item.color }]}>
            Book Now →
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + Spacing.md}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / (ITEM_WIDTH + Spacing.md)
          );
          setActiveIndex(index);
        }}
        contentContainerStyle={styles.carouselContent}
      />
      <View style={styles.pagination}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  carouselContent: {
    paddingHorizontal: Spacing.lg,
  },
  carouselItem: {
    width: ITEM_WIDTH,
    marginRight: Spacing.md,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemContent: {
    padding: Spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  itemTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  itemDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  bookButton: {
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    ...Typography.body,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
  },
});

export default Carousel;