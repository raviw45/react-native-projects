import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

type currencyButtonProps=PropsWithChildren<{
    name:string,
    flag:string
}>
export default function CurrencyButton(currency:currencyButtonProps):JSX.Element {
  return (
    <View style={styles.btn}>
        <Text  style={styles.flag}>{currency.flag}</Text>
        <Text style={styles.name}>{currency.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        borderWidth:2,
        borderColor:'#ccc',
        padding:10,
        margin:5,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flag:{
        fontSize:24,
        marginBottom:20
    },
    name:{
        fontSize:12,
        color:'#000'
    }
})