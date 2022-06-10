import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 50;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

const App = () => {
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [80, 40],
    extrapolate: 'clamp',
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT,
    ],
    extrapolate: 'clamp',
  });
  const headerZIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 20,
    ],
    outputRange: [0, 0, 0, 1],
    extrapolate: 'clamp',
  });
  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 20,
    ],
    outputRange: [-20, -20, -20, 15],
    extrapolate: 'clamp',
  });

  console.log(headerZIndex);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerZIndex,
          alignItems: 'center',
          elevation: headerZIndex,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
            opacity: opacity,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingLeft: 15,
              color: '#000',
            }}>
            Jennifer Vasquaez
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
        style={{flex: 1}}>
        <Animated.View
          style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: 'white',
            borderWidth: 3,
            overflow: 'hidden',
            marginTop: profileImageMarginTop,
            marginLeft: 20,
          }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1547093841-7c02540c29e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
            }}
            style={{flex: 1, width: null, height: null}}></Image>
        </Animated.View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingLeft: 15,
              color: '#000',
            }}>
            Jennifer Vasquaez
          </Text>
        </View>
        <View style={{height: 1000}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
