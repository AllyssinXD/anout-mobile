import { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import HomeSVG from '~/assets/svg/HomeSVG';
import ProjectsSVG from '~/assets/svg/ProjectsSVG';
import UserSVG from '~/assets/svg/UserSVG';

export default function Dashboard() {
  const iconSize = 30;

  const [selected, setSelected] = useState(0);

  const navbarItems = [
    { SVG: HomeSVG, size: iconSize, text: 'Home', selected, setSelected },
    { SVG: ProjectsSVG, size: iconSize, text: 'Projects', selected, setSelected },
    { SVG: UserSVG, size: iconSize, text: 'Conta', selected, setSelected },
    { SVG: ProjectsSVG, size: iconSize, text: 'Avisos', selected, setSelected },
  ];

  return (
    <>
      <View className={'flex-1 bg-night'}>
        <Text className="text-silver">Topasdasd</Text>
      </View>
      <View className={'h-32 flex-row items-center justify-center border-t border-dark bg-night'}>
        <View className="w-96 flex-row items-center justify-between">
          {navbarItems.map((item, i) => {
            console.log(item);
            return <NavbarButton i={i} {...item} />;
          })}
        </View>
      </View>
    </>
  );
}

function NavbarButton({ size, text, selected, setSelected, i, SVG }: any) {
  return (
    <Pressable className="w-30 items-center" onPress={() => setSelected(i)}>
      <SVG width={size} height={size} color={selected == i ? '#c1dc45' : '#E0E0E0'} />
      <Text
        className={`text-md mt-2 w-full text-center ${selected == i ? 'text-emerald' : 'text-silver'}`}>
        {text}
      </Text>
    </Pressable>
  );
}
