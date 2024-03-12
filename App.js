/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity, Text, PermissionsAndroid
} from 'react-native';
import NavigationApp from './apps/navigation/';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import XMLParser from 'react-xml-parser';
import axios from 'axios';
import FilePickerManager from 'react-native-file-picker';

// const url = require('./assets/demo.xml')



const App = () => {
  const filePicker = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      console.log("granted", granted)
    } catch (err) {
      console.log("err in 35",err);
    }
    const readGranted = await PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const writeGranted = await PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    if (!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');
      return;
    }

    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        this.setState({
          file: response
        });
      }
    });
  }

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }


  // Feel free to change main path according to your requirements.


  const newFunc = () => {


    try {
      DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      }).then((results) => {
        console.log(results);
        //that.setState({language: results[0].type});

        const extension = getUrlExtension(results?.uri)
        const localFile = `${RNFS.DocumentDirectoryPath}/${results?.name}`;
        console.log("localFile", localFile)
        var parseString = require('react-native-xml2js').parseString;
        var xml = "<root>Hello xml2js!</root>"
        parseString(localFile, function (err, result) {
          console.log("zzzzzz", result);
        });
        //the code state holds your xml file, just display it however you want... use 3rd party library for syntax highlight or whatever you want
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      newFunc(pickedFile)
      // axios.get(pickedFile?.uri, {
      //   "Content-Type": "application/xml; charset=utf-8"
      // })
      //   .then((response) => {
      //     console.log('Your xml file as string', response.data);
      //   });
      fetch('./assets/demo.xml')
        .then(response => response.text())
        .then(data => {
          console.log('File Data = ', data)
          let parser = new DOMParser();
          let xml = parser.parseFromString(data, "application/xml");
          console.log('XML = ', xml);
        })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("err", err);
      } else {
        console.log("error in 35", err);
        throw err;
      }
    }
  };


  const handleSubmit = (event) => {
    console.log("event", event)
    // event.preventDefault();

    const file = event.uri;

    const reader = new FileReader();

    reader.readAsText(file);
    console.log("reader", reader, file)
    reader.onloadend = evt => {
      const readerData = evt.target.result;

      const parser = new DOMParser();
      const xml = parser.parseFromString(readerData, "text/xml");

      console.log(
        "data",
        new XMLSerializer().serializeToString(xml.documentElement)
      );
      var XMLParser = require("react-xml-parser");
      var NewXml = new XMLParser().parseFromString(
        new XMLSerializer().serializeToString(xml.documentElement)
      ); // Assume xmlText contains the example XML
      console.log("newxml", NewXml);

      this.setState({ xml });
    };
  }


  return (
    <SafeAreaView style={styles?.backgroundStyle}>
      <StatusBar
        backgroundColor={"#fff"}
        barStyle={"dark-content"}
      />
      <TouchableOpacity onPress={() => filePicker()} style={{ padding: 10, backgroundColor: 'red' }}>
        <Text style={{}}>Load & Parse</Text>
      </TouchableOpacity>
      {/* <NavigationApp /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundStyle: {
    flex: 1
  }
});

export default App;
