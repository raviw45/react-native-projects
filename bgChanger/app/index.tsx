import { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Index() {
  const [randomColor,setRandomColor]=useState('#666');

  const generateColor=()=>{
    let hexRange="0123456789ABCDEF";
    let color='#';
    for(let i=0;i<6;i++){
      color+=hexRange[Math.floor(Math.random()*16)];
    }
    setRandomColor(color);
  }
  return (
    <>
      <StatusBar backgroundColor={randomColor} />
       <View style={[styles.pressButton,{backgroundColor:randomColor}]}>
          <TouchableOpacity activeOpacity={0.6} onPress={generateColor}>
            <View style={styles.actionBtn}>
                <Text style={{fontSize:20,color:'#fff'}}>Press Me</Text>
            </View>
          </TouchableOpacity>
       </View>
    </>
  );
}

const styles=StyleSheet.create({
    pressButton:{
           flex:1,
           justifyContent:'center',
           alignItems:'center'
    },
    actionBtn:{
       backgroundColor:'#028B8B',
       padding:10,
       borderRadius:5,
       width:200,
       height:50,
       justifyContent:'center',
       alignItems:'center'
    }
});