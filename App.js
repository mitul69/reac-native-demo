
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,View,TouchableHighlight,NativeModules
} from 'react-native'

import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'

class TestResult extends Component {
    render() {
      const text = (this.props.value == null) ? "?" :(this.props.value ? "Pass":"Fail")
      const style = {color:(this.props.value == null ? "black" : (this.props.value ? "green":"red"))}
      return (
        <View style={styles.testContainer}>
          <Text style={styles.testLabel}>{this.props.name}:</Text>
          <Text style={[styles.testResult,style]}>{text}</Text>
        </View>
      );
    }

  }

class TestValue extends Component {
    render() {
      return (
        <View style={styles.testContainer}>
          <Text style={styles.testLabel}>{this.props.name}:</Text>
          <Text style={[styles.testResult]}>{this.props.value}</Text>
        </View>
      );
    }

  }

export default class Example extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sodium_version_string : "",
      privateKey : "",
    }
  }


  _handleError = (error) => {
    console.log(error)
    this.setState({sodiumError: error})
  }



  _testSodium = () => {

    
    const k = "/AllqhynaA/pvvdMhoILo2YNxQ1MnxtQlOKTR1jZV0I="; 
    // Base64.fromByteArray(new Uint8Array([
    //   0x1b, 0x27, 0x55, 0x64, 0x73, 0xe9, 0x85, 0xd4, 0x62, 0xcd, 0x51, 0x19, 0x7a, 0x9a, 0x46, 0xc7,
    //   0x60, 0x09, 0x54, 0x9e, 0xac, 0x64, 0x74, 0xf2, 0x06, 0xc4, 0xee, 0x08, 0x44, 0xf6, 0x83, 0x89]))

    const n = Base64.fromByteArray(new Uint8Array([
      0x69, 0x69, 0x6e, 0xe9, 0x55, 0xb6, 0x2b, 0x73, 0xcd, 0x62, 0xbd, 0xa8,
      0x75, 0xfc, 0x73, 0xd6, 0x82, 0x19, 0xe0, 0x03, 0x6b, 0x7a, 0x0b, 0x37]))

    const m = window.btoa("I Love My India"); /* Base64.fromByteArray(new Uint8Array([
      0xbe, 0x07, 0x5f, 0xc5, 0x3c, 0x81, 0xf2, 0xd5, 0xcf, 0x14, 0x13, 0x16,
      0xeb, 0xeb, 0x0c, 0x7b, 0x52, 0x28, 0xc5, 0x2a, 0x4c, 0x62, 0xcb, 0xd4,
      0x4b, 0x66, 0x84, 0x9b, 0x64, 0x24, 0x4f, 0xfc, 0xe5, 0xec, 0xba, 0xaf,
      0x33, 0xbd, 0x75, 0x1a, 0x1a, 0xc7, 0x28, 0xd4, 0x5e, 0x6c, 0x61, 0x29,
      0x6c, 0xdc, 0x3c, 0x01, 0x23, 0x35, 0x61, 0xf4, 0x1d, 0xb6, 0x6c, 0xce,
      0x31, 0x4a, 0xdb, 0x31, 0x0e, 0x3b, 0xe8, 0x25, 0x0c, 0x46, 0xf0, 0x6d,
      0xce, 0xea, 0x3a, 0x7f, 0xa1, 0x34, 0x80, 0x57, 0xe2, 0xf6, 0x55, 0x6a,
      0xd6, 0xb1, 0x31, 0x8a, 0x02, 0x4a, 0x83, 0x8f, 0x21, 0xaf, 0x1f, 0xde,
      0x04, 0x89, 0x77, 0xeb, 0x48, 0xf5, 0x9f, 0xfd, 0x49, 0x24, 0xca, 0x1c,
      0x60, 0x90, 0x2e, 0x52, 0xf0, 0xa0, 0x89, 0xbc, 0x76, 0x89, 0x70, 0x40,
      0xe0, 0x82, 0xf9, 0x37, 0x76, 0x38, 0x48, 0x64, 0x5e, 0x07, 0x05]))  */

    const handleError = (e) => {this.setState({crypto_secretbox1:false});console.log(e)}
    this.setState({crypto_secretbox1:null})


    this.setState({
        publickKey : m,
        privateKey : n,
        text : k,
      })


    Sodium.crypto_secretbox_easy(m, n, k)
     .then((c) => Sodium.crypto_secretbox_open_easy(c,n,k),handleError)
     .then((mm) => this.setState({crypto_secretbox1:(m === mm)}),handleError)



    // Sodium.sodium_version_string()
    //   .then((version) => this.setState({sodium_version_string: version}))
    //   .catch((error) => this._handleError(error));

    //   // let publickKey = "/AllqhynaA/pvvdMhoILo2YNxQ1MnxtQlOKTR1jZV0I=";
    //   // let privateKey = Base64.fromByteArray(new Uint8Array([
    //   //   0x69, 0x69, 0x6e, 0xe9, 0x55, 0xb6, 0x2b, 0x73, 0xcd, 0x62, 0xbd, 0xa8,
    //   //   0x75, 0xfc, 0x73, 0xd6, 0x82, 0x19, 0xe0, 0x03, 0x6b, 0x7a, 0x0b, 0x37]));
    //   // this.setState({
    //   //   publickKey : publickKey,
    //   //   privateKey : privateKey
    //   // })
    //   //  let k ="Hello World";
    //   //  Sodium.crypto_secretbox_easy(privateKey, publickKey, k)
    //   // .then((c) => {
    //   //   alert("hi");
    //   //   Sodium.crypto_secretbox_open_easy(c,publickKey,k)
    //   //   }, this._handleError)
    //   // .then((mm) => {
    //   //   this.setState({crypto_secretbox1:(publickKey === mm)})
    //   // },
    //   // this._handleError
    //   // )

  }

  componentDidMount() {
     this._testSodium();
     
  }

  render() {
    return (
      <ScrollView style={{flex:1}}>
        <TouchableHighlight onPress={() => this._testSodium()}>
          <Text style={styles.welcome}>
            Salted React Native!
          </Text>
        </TouchableHighlight>
        <TestValue name="sodium_version_string" value={this.state.sodium_version_string}/>
        <TestValue name="privateKey" value={this.state.publickKey}/>
        <TestValue name="privateKey" value={this.state.privateKey}/>
        <TestValue name="Text" value={this.state.text}/>
        <TestResult name="randombytes_random" value={this.state.crypto_secretbox1}/>
        <TestValue name="sodiumError" value={this.state.sodiumError}/>
      
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:5
  },

  testContainer: {
    flex: 1,
    flexDirection:'row',
    padding:5
  },

  testLabel: {
    flex:4,
    textAlign: 'left',
    color: '#333333',
  },

  testResult: {
    flex:1,
    textAlign: 'center',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
})