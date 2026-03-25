import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import React from "react";
import { ViewStyle } from "react-native";

export function HapticTab(props: BottomTabBarButtonProps) {
  const isFocused = !!props.accessibilityState?.selected;
  const [pressed, setPressed] = React.useState(false);

  const base: ViewStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  };

  const activeStyle: ViewStyle = isFocused
    ? {
        backgroundColor: "rgb(241, 5, 5)",
      }
    : {};

  const pressedStyle: ViewStyle = pressed
    ? {
        transform: [{ scale: 0.92 }],
        opacity: 0.85,
      }
    : {};

  return (
    <PlatformPressable
      {...props}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      style={[base, activeStyle, pressedStyle, props.style as any]}
      onPressIn={(ev) => {
        setPressed(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.onPressIn?.(ev);
        console.log(ev);
      }}
      onPressOut={(ev) => {
        setPressed(false);
        props.onPressOut?.(ev);
      }}
    />
  );
}