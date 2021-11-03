import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../styles/colors';

interface Props {
  title?: string;
  onPress: () => void;
  children?: JSX.Element | JSX.Element[];
  style?: ViewStyle;
  variant?: 'primary' | 'ghost';
}

const Button = ({
  title,
  onPress,
  children,
  style = {},
  variant = 'primary',
}: Props) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => onPress();
  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const backgroundStyle: ViewStyle = {
    backgroundColor: variant === 'ghost' ? 'transparent' : Colors.primary,
  };

  const textColorStyle: TextStyle = {
    color: variant === 'ghost' ? 'black' : 'white',
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        isPressed && styles.buttonPressed,
        backgroundStyle,
        style,
      ]}>
      {title ? (
        <Text style={[styles.text, textColorStyle]}>{title}</Text>
      ) : children ? (
        children
      ) : (
        <></>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
    padding: 16,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
