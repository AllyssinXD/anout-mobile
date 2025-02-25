import { StatusBar } from 'expo-status-bar';

import './global.css';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const pages = [<Welcome/>, <Account/>, <Text/>]

  const [stepIndex, setStepIndex] = useState(0)

  return (
    <SafeAreaProvider>
    <SafeAreaView className='flex-1 justify-center items-center p-none bg-night'>
      <View className='flex-1'>
      {pages[stepIndex]}
      </View>
      <View className='mb-5 w-full justify-end p-10'>
        <View className='mx-auto my-10 w-36 justify-between flex-row'>
          {
            pages.map((_,i)=><Circle selected={stepIndex} index={i} key={i}/>)
          }    
        </View>
        {stepIndex < 2 &&
        <Pressable
        onPress={()=>setStepIndex(stepIndex+1)}
        className='bg-crimson p-5 w-full rounded-md'>
          <Text className='text-silver text-center font-bold'>Avançar</Text>
        </Pressable>
        }
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Circle(props: {selected: number, index: number}){
  return <View
  className={`w-5 h-5 border border-emerald rounded-full ${props.selected == props.index ? "bg-emerald" : ""}`}></View>
}

function Welcome(){
  return <View className="flex-1 justify-center bg-night">
          <Text className="text-[2.2rem] text-silver w-96 text-left">Bem vindo ao <Text className='text-emerald font-bold'>Anout</Text></Text>
          <Text className='mt-10 text-xl text-silver w-96 text-left'>Seu novo app favorito para organizar seus afazeres.{("\n\n")}Aqui, irá criar listas, to-dos e configurá-los para maximizar sua produtividade e não esquecer do que tem que fazer.</Text>
        </View>;
}

function Account(){
  return <View className='flex-1 justify-center'>
    <Text className='text-silver text-[2.2rem]'>Entre ou Crie uma conta</Text>
    <View>
      
    </View>
    <TextInput keyboardType='email-address' className='w-full text-silver p-3 rounded-md border border-silver'></TextInput>
  </View>
}