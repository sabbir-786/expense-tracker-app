import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from 'react-native-size-matters'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/authContext'
import Typo from '@/components/Typo'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      routeName: '/(modals)/profileModal',
      bgColor: '#6366f1',
    },
    {
      title: "Settings",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      routeName: '/settings',
      bgColor: '#059669',
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      routeName: '/privacy',
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      routeName: '/logout',
      bgColor: '#e11d48',
    },
  ]

  const handleLogout = async () => {
    await signOut(auth);
  }

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout? ", [
      {
        text: "Cancel",
        style: 'cancel'
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: 'destructive'
      }

    ])
  }

  const handlePress = (item: accountOptionType) => {
    if (item.title == 'Logout') {
      showLogoutAlert();
    }

    if (item.routeName) router.push(item.routeName)

  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Profile' />

        <View style={styles.userInfo}>
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit='cover'
              transition={100}
            />
          </View>

          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight='600' color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* account options */}
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => {
            return (
              <Animated.View entering={FadeInDown.delay(index * 50).springify().damping(14)} style={styles.listItem} key={index}>
                <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                  {/* icon */}
                  <View
                    style={[
                      styles.listIcon,
                      { backgroundColor: item?.bgColor }
                    ]}
                  >
                    {item.icon && item.icon}
                  </View>

                  <Typo size={16} style={{ flex: 1 }} fontWeight={"500"}>
                    {item.title}
                  </Typo>

                  <Icons.CaretRight
                    size={verticalScale(20)}
                    weight="bold"
                    color={colors.white}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._5,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
})
