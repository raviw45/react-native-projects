import CurrencyButton from "@/components/CurrencyButton";
import { currencyBag } from "@/constants/constants";
import { useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Snackbar from 'react-native-snackbar';


export default function Index() {
  const [inputValue,setInputValue]=useState('');
  const [resultValue,setResultValue]=useState('');
  const [targetCurrency,setTargetCurrency]=useState('');


  const buttonPressed = (targetValue: Currency) => {

    const inputAmount = parseFloat(inputValue)
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)  }`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    }else{

    }
  }
  return (
      <SafeAreaView>

          <View style={styles.inputContainer}>
              <Text style={styles.heading}>Currency Converter</Text>
              <View>
                  <Text style={{fontSize:18,color:'#000'}}>Enter Amount in &#8377;:</Text>
                  <TextInput
                      style={styles.textInput}
                      value={inputValue}
                      placeholder="Enter Amount"
                      keyboardType="numeric"
                      onChangeText={setInputValue}
                  />
              </View>
              {
                resultValue && (
                  <View style={{marginTop:10}}>
                      <Text style={{fontSize:18,color:'#000'}}>Result in {targetCurrency}:</Text>
                      <Text style={{fontSize:18,color:'#000'}}>{resultValue}</Text>
                  </View>
                )
              }
          </View>
          <View style={styles.flatList}>
              <FlatList
                numColumns={3}
                data={currencyBag}
                renderItem={({item})=>(
                  <Pressable
                   style={styles.button}
                   onPress={()=>buttonPressed(item)}
                  >
                    <CurrencyButton {...item} />
                  </Pressable>
                )}
              />
          </View>
      </SafeAreaView>
  );
}


const styles=StyleSheet.create({
  

  inputContainer:{
    margin:10,
    justifyContent:'center',
    alignItems:'center'
  },
    heading:{
      fontSize:24,
      marginBottom:10,
      color:'#000'
    },
    textInput:{
      height:40,
      borderColor:'#ccc',
      borderWidth:1,
      padding:10,
      marginBottom:10,
      borderRadius:10,
      marginTop:10,
    },
    flatList:{
      marginTop:20,
       justifyContent:'center',
       alignItems: 'center',
    },
    button:{
      width:100,
      height:100,
      margin:10,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
    }


})