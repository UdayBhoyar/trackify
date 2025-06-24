import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: NavigationProp;
};

type Field = 'fullName' | 'email' | 'password' | 'confirmPassword';

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<Record<Field, string>>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: Field, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Please create a password');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Signup data:', formData);

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Social Login', `Continue with ${provider}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Continue', onPress: () => console.log(`${provider} login`) },
    ]);
  };

  const renderInputField = (
    field: Field,
    placeholder: string,
    icon?: string,
    secureTextEntry: boolean = false,
    showPasswordToggle: boolean = false
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        secureTextEntry={secureTextEntry}
        autoCapitalize={field === 'email' ? 'none' : 'words'}
        keyboardType={field === 'email' ? 'email-address' : 'default'}
      />
      {showPasswordToggle && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => {
            if (field === 'password') {
              setShowPassword(!showPassword);
            } else {
              setShowConfirmPassword(!showConfirmPassword);
            }
          }}
        >
          <Icon
            name={
              (field === 'password' && showPassword) ||
              (field === 'confirmPassword' && showConfirmPassword)
                ? 'visibility'
                : 'visibility-off'
            }
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo.jpg')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Create your account</Text>

          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              {renderInputField('fullName', 'Enter your full name')}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              {renderInputField('email', 'your@email.com')}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Password</Text>
              {renderInputField(
                'password',
                'Create a password',
                'lock',
                !showPassword,
                true
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Confirm Password</Text>
              {renderInputField(
                'confirmPassword',
                'Confirm your password',
                'lock',
                !showConfirmPassword,
                true
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.signupButton, isLoading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.dividerText}>or continue with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <Icon name="google" size={20} color="#4285f4" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Facebook')}
            >
              <Icon name="facebook" size={20} color="#1877f2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <Icon name="apple" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signinLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 4,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    color: '#666',
  },
  signinLink: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
  },
});

export default SignupScreen;
