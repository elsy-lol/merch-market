import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, commonStyles } from '../styles/theme';
import { SvgUser, SvgLock, SvgEye, SvgEyeOff } from '../components/CustomSvg';
import { useAuth } from '../context/AuthContext';

interface LoginScreenProps {
  navigation?: any;
  onNavigate?: (tab: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) { setError('Заполните все поля'); return; }
    setLoading(true);
    setError('');
    const result = await login(username, password);
    if (!result.success) setError(result.error || 'Ошибка');
    setLoading(false);
  };

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <SvgLock size={40} color="#f59e0b" />
        <Text style={styles.title}>ВХОД</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.inputGroup}>
        <SvgUser size={18} color="#64748b" />
        <TextInput style={styles.input} placeholder="Имя пользователя" placeholderTextColor="rgba(255,255,255,0.2)" value={username} onChangeText={setUsername} autoCapitalize="none" />
      </View>

      <View style={styles.inputGroup}>
        <SvgLock size={18} color="#64748b" />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="Пароль" placeholderTextColor="rgba(255,255,255,0.2)" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <SvgEyeOff size={18} color="#64748b" /> : <SvgEye size={18} color="#64748b" />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} disabled={loading} style={[commonStyles.buttonGold, styles.loginBtn, loading && { opacity: 0.5 }]}>
        <Text style={commonStyles.buttonGoldText}>{loading ? 'Вход...' : 'Войти'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
        <Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 60, alignItems: 'center', gap: 16 },
  header: { alignItems: 'center', gap: 12, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.text, letterSpacing: 3 },
  error: { color: COLORS.red, fontSize: 13, textAlign: 'center', backgroundColor: 'rgba(239,68,68,0.1)', padding: 10, borderRadius: RADIUS.md, width: '100%' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.md, paddingHorizontal: 14, gap: 10, width: '100%' },
  input: { flex: 1, paddingVertical: 14, color: COLORS.text, fontSize: 15 },
  loginBtn: { width: '100%', justifyContent: 'center', marginTop: 8 },
  link: { color: COLORS.accent, fontSize: 13, marginTop: 8 },
});

export default LoginScreen;
