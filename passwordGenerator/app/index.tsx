import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordSchema=Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be min of 4 characters')
  .max(16, 'Should be max of 16 characters')
  .required('Length is required')
  
})
export default function index() {
  const [password,setPassword]=useState("");
  const [isPasswordGenerated,setIsPasswordGenerated]=useState(false);

  const [lowercase,setLowercase]=useState(true);
  const [uppercase,setUppercase]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [specialCharacters,setSpecialCharacters]=useState(false);

  const generatePasswordString=(passowrdLength:number)=>{
    let characterList='';

    if(lowercase) characterList+='abcdefghijklmnopqrstuvwxyz';
    if(uppercase) characterList+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(numbers) characterList+='0123456789';
    if(specialCharacters) characterList+='!@#$%^&*()_+~`|}{[]\:;?><,./-=';

    const passwordResult=createPassword(characterList,passowrdLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  }

  const createPassword=(characters:string,passowrdLength:number)=>{
    let results='';
    for(let i=0;i<passowrdLength;i++){
      const characterIndex=Math.round(Math.random()*characters.length);
      results+=characters.charAt(characterIndex);
    }
    return results;
  }

  const resetPassword=()=>{
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSpecialCharacters(false);
  }
  return (
    <SafeAreaView style={{backgroundColor:'#444',flex:1,paddingHorizontal:10,paddingVertical:5}}>
      <ScrollView>
                <Text style={styles.heading}>Password Generator</Text>
          <View>
                 <Formik
                    initialValues={{ passwordLength: '' }}
                    validationSchema={passwordSchema}
                    onSubmit={ values => {
                     console.log(values);
                     generatePasswordString(+values.passwordLength) 
                    }}
                 >
                   {({
                     values,
                     errors,
                     touched,
                     isValid,
                     handleChange,
                     handleSubmit,
                     handleReset,
                   })=>(
                    <>
                    <View style={styles.inputWrapper}>
                         <View style={styles.inputLabels}>
                            <Text style={{fontSize:18,color:'#fff'}}>Enter Password Length</Text>
                            {touched.passwordLength && errors.passwordLength && (
                              <Text style={styles.errorText}>
                                {errors.passwordLength}
                              </Text>
                            )}
                         </View>
                         <TextInput
                           placeholderTextColor={"#888"}
                          style={styles.input}
                          value={values.passwordLength}
                          onChangeText={handleChange('passwordLength')}
                          placeholder="Ex. 8"
                          keyboardType='numeric'
                          />
                    </View>
                     <View style={styles.checkboxContainer}>
                        <View style={styles.checkbox}>
                          <Text style={{fontSize:18,color:'#fff'}}>Include Lowercase Letters</Text>
                          <BouncyCheckbox
                          isChecked={lowercase}
                              size={25}
                              fillColor="red"
                              unFillColor="#FFFFFF"
                              text="Custom Checkbox"
                              disableText={true}
                              iconStyle={{ borderColor: "red" }}
                              innerIconStyle={{ borderWidth: 2 }}
                              onPress={()=>setLowercase(!lowercase)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                          <Text style={{fontSize:18,color:'#fff'}}>Include Uppercase Letters</Text>
                          <BouncyCheckbox
                              isChecked={uppercase}
                              size={25}
                              fillColor="red"
                              unFillColor="#FFFFFF"
                              text="Custom Checkbox"
                              disableText={true}
                              iconStyle={{ borderColor: "red" }}
                              innerIconStyle={{ borderWidth: 2 }}
                              onPress={()=>setUppercase(!uppercase)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                          <Text style={{fontSize:18,color:'#fff'}}>Include Numbers</Text>
                          <BouncyCheckbox
                          isChecked={numbers}
                              size={25}
                              fillColor="red"
                              unFillColor="#FFFFFF"
                              text="Custom Checkbox"
                              disableText={true}
                              iconStyle={{ borderColor: "red" }}
                              innerIconStyle={{ borderWidth: 2 }}
                              onPress={()=>setNumbers(!numbers)}
                            />
                        </View>
                        <View style={styles.checkbox}>
                          <Text style={{fontSize:18,color:'#fff'}}>Include Special Characters</Text>
                          <BouncyCheckbox
                          isChecked={specialCharacters}
                              size={25}
                              fillColor="red"
                              unFillColor="#FFFFFF"
                              text="Custom Checkbox"
                              disableText={true}
                              iconStyle={{ borderColor: "red" }}
                              innerIconStyle={{ borderWidth: 2 }}
                              onPress={()=>setSpecialCharacters(!specialCharacters)}
                            />
                        </View>
                     </View>
                     <View  style={styles.btnWrapper}>
                     <TouchableOpacity
                          disabled={!isValid}
                          style={styles.primaryBtn}
                          onPress={()=>handleSubmit()}
                          >
                            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                          style={styles.secondaryBtn}
                          onPress={ () => {
                            handleReset();
                            resetPassword()
                          }}
                          >
                            <Text style={styles.secondaryBtnTxt}>Reset</Text>
                   </TouchableOpacity>
                     </View>
                    </>
                   )}
                 </Formik>
                 {
                      isPasswordGenerated && (
                        <View style={styles.textModal}>
                            <Text style={{fontSize:18,color:'#fff'}}>Press on text to copy</Text>
                            <Text selectable style={{fontSize:20,color:'#fff'}}>{password}</Text>
                        </View>
                      )
                }
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading:{
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
    marginBottom:15,
    flex:1,
    justifyContent:'center',
    alignSelf:'center',
  },
  inputWrapper:{
    justifyContent: 'center',
    flexDirection:'row',
    gap:15,
  },
  inputLabels:{
    flex:1,
    flexDirection:'column',
    gap:10
  },
  errorText:{
    fontSize:16,
    color:'red'
  },
  input:{
    borderWidth:1,
    borderColor:'#fff',
    paddingHorizontal:20,
    marginBottom:10,
    fontSize:16,
    color:'#fff',
    backgroundColor:'#333',
    borderRadius:5,
    paddingVertical:5
  },
  checkbox:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15,
    paddingHorizontal:10,
    backgroundColor:'#333',
    borderRadius:5,
    paddingVertical:10,
    gap:10,
    color:'#fff'
  },
  checkboxContainer:{
    marginTop:10,
  },
  btnWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',                                                                                                                                                                                                                   
    justifyContent:'center',
    alignItems:'center',
    fontWeight: '700',
  },
  primaryBtnTxt: {
    fontSize:18,                                                                                                                                                                                                                                                            
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
    justifyContent:'center',
    alignItems:'center',
    fontWeight: '700',
  },
  secondaryBtnTxt: {
    fontSize:18,
    textAlign: 'center',
  },
  textModal:{
    marginTop:10,
    paddingHorizontal:20,
    backgroundColor:'#333',
    borderRadius:5,
    paddingVertical:10,
    color:'#fff',
    justifyContent: 'center',
    alignSelf:'center',
    flex:1,
    marginBottom:10,
    fontSize:16,
    fontWeight:'bold'
  }
})