import { PropsWithChildren, useState } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

import DiceOne from "@/assets/images/One.png";
import DiceTwo from "@/assets/images/Two.png";
import DiceThree from "@/assets/images/Three.png";
import DiceFour from "@/assets/images/Four.png";
import DiceFive from "@/assets/images/Five.png";
import DiceSix from "@/assets/images/Six.png";

type DiceImageProp=PropsWithChildren<{
  imageUrl:ImageSourcePropType
}>

export const Dice=({imageUrl}:DiceImageProp)=>{
    return(
      <View>
        <Image
          source={imageUrl}
          style={styles.diceImage}
        />
      </View>
    )
}

export default function Index():JSX.Element {
  const [diceImage,setDiceImage] =useState(DiceOne);

  const handleImageChange=()=>{
    const randomNumber=Math.floor(Math.random()*6)+1;
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        break;
      case 2:
        setDiceImage(DiceTwo);
       break;
      case 3:
        setDiceImage(DiceThree);
        break;
      case 4:
        setDiceImage(DiceFour);
        break;
      case 5:
        setDiceImage(DiceFive);
        break;
      case 6:
        setDiceImage(DiceSix);
        break;
      default:
        setDiceImage(DiceOne); 
        break;
    } 
  }
  return (
    <>
      <View style={styles.container}>
          <Dice imageUrl={diceImage} />
          <Pressable style={styles.btn} onPress={handleImageChange}>
            <Text style={styles.btnTxt}>Press me</Text>
          </Pressable>
      </View>
    </>
  );
}


const styles=StyleSheet.create({
  container:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
  },
  diceImage:{
    width:200,
    height:200,
    resizeMode:'contain'
  },
  btn:{
    borderWidth:1,
    borderColor:'black',
    padding:10,
    borderRadius:5,
    marginTop:20,
    cursor:'pointer'
  },
  btnTxt:{
    fontSize:20,
    fontWeight:'bold'
  }
})