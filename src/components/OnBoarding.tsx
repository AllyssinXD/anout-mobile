import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useAuth } from '~/contexts/AuthContext';
import { useAppContext } from '~/hooks/useAppContext';
import useCookieManager from '~/hooks/useCookieManager';

export interface OnBoardingContextInterface {
  stepIndex: number;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  canAdvance: boolean;
  setCanAdvance: React.Dispatch<React.SetStateAction<boolean>>;
  hideAdvance: boolean;
  setHideAdvance: React.Dispatch<React.SetStateAction<boolean>>;
}

export const onBoardingContext = createContext<OnBoardingContextInterface | null>(null);

export default function OnBoarding() {
  const appContext = useAppContext();

  const pages = [<Welcome />, <Account />, <Ready />];

  const [stepIndex, setStepIndex] = useState(0);
  const [canAdvance, setCanAdvance] = useState(true);
  const [hideAdvance, setHideAdvance] = useState(false);

  useEffect(() => {
    if (stepIndex == 1) setHideAdvance(true);
    if (stepIndex == 3) appContext.setIsOnBoarding(false);
  }, [stepIndex]);

  return (
    <onBoardingContext.Provider
      value={{ stepIndex, setStepIndex, canAdvance, setCanAdvance, hideAdvance, setHideAdvance }}>
      <View className="p-none flex-1 items-center justify-center bg-dark">
        <View className="flex-1">{pages[stepIndex]}</View>
        <View className="mb-5 w-full justify-end p-10">
          <View className="mx-auto my-10 w-36 flex-row justify-between">
            {pages.map((_, i) => (
              <Circle selected={stepIndex} index={i} key={i} />
            ))}
          </View>
          {!hideAdvance && <AdvanceButton />}
        </View>
        <StatusBar style="auto" />
      </View>
    </onBoardingContext.Provider>
  );
}

function Circle(props: { selected: number; index: number }) {
  return (
    <View
      className={`h-5 w-5 rounded-full border border-emerald ${props.selected == props.index ? 'bg-emerald' : ''}`}></View>
  );
}

function Welcome() {
  return (
    <View className="flex-1 justify-center bg-dark">
      <Text className="w-96 text-left text-[2.2rem] text-silver">
        Bem vindo ao <Text className="font-bold text-emerald">Anout</Text>
      </Text>
      <Text className="mt-10 w-96 text-left text-xl text-silver">
        Seu novo app favorito para organizar seus afazeres.{'\n\n'}Aqui, irá criar listas, to-dos e
        configurá-los para maximizar sua produtividade e não esquecer do que tem que fazer.
      </Text>
    </View>
  );
}

function Account() {
  const [authComponent, setAuthComponent] = useState<ReactElement | null>(null);

  const AuthOptions = () => {
    return (
      <View>
        <Text className="text-[2.2rem] text-silver">Entre ou Crie uma conta</Text>
        <View className="mt-10">
          <Pressable
            onPress={() => setAuthComponent(<Login />)}
            className="rounded-md bg-crimson p-5">
            <Text className="text-center font-bold text-silver">Entrar</Text>
          </Pressable>
        </View>
        <View className="mt-10">
          <Pressable className="rounded-md bg-emerald p-5">
            <Text className="text-center font-bold text-dark">Criar Conta</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const Login = () => {
    const authContext = useAuth();
    const boardingContext = useContext(onBoardingContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const tryLogin = async () => {
      setLoading(true);
      const login = await authContext!.onLogin!(email, password);
      if (login && login.error) {
        setLoading(false);
      } else {
        setLoading(false);
        boardingContext?.setStepIndex(boardingContext.stepIndex + 1);
      }
    };

    return (
      <View className="w-96 items-center justify-center">
        {loading ? (
          <Loading size={20} />
        ) : (
          <>
            <Text className="w-96 text-[2.2rem] font-bold text-silver">Faça Login</Text>
            <Text className="mt-10 w-96 text-xl text-silver">Coloque suas credenciais</Text>
            <View className="mt-10">
              <Text className="w-96 text-left font-bold text-silver">Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="my-5 rounded-md border border-silver p-5 text-silver"
                keyboardType="email-address"
              />
            </View>
            <View className="mt-10">
              <Text className="w-96 text-left font-bold text-silver">Senha</Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="my-5 rounded-md border border-silver p-5 text-silver"
                keyboardType="visible-password"
              />
            </View>
            <Pressable onPress={tryLogin} className="mt-10 w-96 rounded-md bg-crimson p-5">
              <Text className="text-center font-bold text-silver">Fazer Login</Text>
            </Pressable>
          </>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center">{authComponent ? authComponent : <AuthOptions />}</View>
  );
}

function Ready() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const authContext = useAuth();
  const boardingContext = useContext(onBoardingContext);

  async function loadUser() {
    setLoading(true);

    const user = await authContext.getUser!();
    console.log(user.username);
    setUsername(user.username);

    setLoading(false);
    boardingContext?.setCanAdvance(true);
    boardingContext?.setHideAdvance(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      {loading || !username ? (
        <Loading size={20} />
      ) : (
        <>
          <Text className="text-[2.2rem] font-bold text-silver">Bem vindo {username}!</Text>
          <View className="mt-10">
            <Text className="text-center text-[1.2rem] text-silver">
              Vamos começar sua jornada no mundo da organização!
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

function AdvanceButton() {
  const boardingContext = useContext(onBoardingContext);
  const [pressing, setPressing] = useState(false);

  return (
    <Pressable
      onPress={() =>
        boardingContext?.canAdvance
          ? boardingContext?.setStepIndex(boardingContext.stepIndex + 1)
          : null
      }
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
      className={`w-full rounded-md p-5 ${boardingContext?.canAdvance ? (pressing ? 'bg-red-900' : 'bg-crimson') : 'bg-dark'}`}>
      <Text
        className={`text-center font-bold text-silver ${boardingContext?.canAdvance ? '' : 'opacity-10'}`}>
        Avançar
      </Text>
    </Pressable>
  );
}

function Loading({ size }: { size: number }) {
  return (
    <View className={`m-auto h-${size} w-${size} rounded-full bg-emerald`}>
      <View className={`m-auto h-${size - 4} w-${size - 4} rounded-full bg-dark`}></View>
    </View>
  );
}
