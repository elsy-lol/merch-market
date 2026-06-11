import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgUser, SvgLock, SvgMail, SvgEye, SvgEyeOff } from '../components/CustomSvg';
import { useAuth } from '../context/AuthContext';

interface RegisterScreenProps {
  navigation?: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) { setError('Заполните все поля'); return; }
    if (password !== confirmPassword) { setError('Пароли не совпадают'); return; }
    if (password.length < 3) { setError('Пароль слишком короткий'); return; }
    setLoading(true);
    setError('');
    const result = await register(username, email, password, displayName || username);
    if (!result.success) setError(result.error || 'Ошибка');
    setLoading(false);
  };

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <SvgUser size={40} color="#f59e0b" />
        <Text style={styles.title}>РЕГИСТРАЦИЯ</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {[{ icon: <SvgUser size={18} color="#64748b" />, placeholder: 'Имя пользователя', value: username, set: setUsername },
        { icon: <SvgMail size={18} color="#64748b" />, placeholder: 'Email', value: email, set: setEmail },
        { icon: <SvgUser size={18} color="#64748b" />, placeholder: 'Отображаемое имя', value: displayName, set: setDisplayName },
      ].map((f, i) => (
        <View key={i} style={styles.inputGroup}>
          {f.icon}
          <TextInput style={styles.input} placeholder={f.placeholder} placeholderTextColor="rgba(255,255,255,0.2)" value={f.value} onChangeText={f.set} autoCapitalize="none" />
        </View>
      ))}

      <View style={styles.inputGroup}>
        <SvgLock size={18} color="#64748b" />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="Пароль" placeholderTextColor="rgba(255,255,255,0.2)" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <SvgEyeOff size={18} color="#64748b" /> : <SvgEye size={18} color="#64748b" />}
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <SvgLock size={18} color="#64748b" />
        <TextInput style={styles.input} placeholder="Подтвердите пароль" placeholderTextColor="rgba(255,255,255,0.2)" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} />
      </View>

      <TouchableOpacity onPress={handleRegister} disabled={loading} style={[commonStyles.buttonGold, styles.registerBtn, loading && { opacity: 0.5 }]}>
        <Text style={commonStyles.buttonGoldText}>{loading ? 'Регистрация...' : 'Зарегистрироваться'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
        <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 40, alignItems: 'center', gap: 14 },
  header: { alignItems: 'center', gap: 12, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.text, letterSpacing: 3 },
  error: { color: COLORS.red, fontSize: 13, textAlign: 'center', backgroundColor: 'rgba(239,68,68,0.1)', padding: 10, borderRadius: RADIUS.md, width: '100%' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.md, paddingHorizontal: 14, gap: 10, width: '100%' },
  input: { flex: 1, paddingVertical: 14, color: COLORS.text, fontSize: 15 },
  registerBtn: { width: '100%', justifyContent: 'center', marginTop: 8 },
  link: { color: COLORS.accent, fontSize: 13, marginTop: 4 },
});

export default RegisterScreen;
