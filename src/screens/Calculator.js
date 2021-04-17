import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { heightToDp, widthToDp } from "../helpers/dim";
import axios from "axios";
import TextInput from "../components/TextInput";
import ModalDropdown from "react-native-modal-dropdown";

export default function LoginScreen() {
  const [result, setResult] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState("");

  function getdata() {
    if (operation == 0) {
    axios
      .post(
        "https://us-central1-suhail-f1d6e.cloudfunctions.net/endpoints/add",
        {
          num1: num1,
          num2: num2,
        }
      )
      .then((response) => {
        console.log(response.data.result);
        setResult("The answer is "+response.data.result);
      });
    }
    else if (operation == 1)  {
      axios
        .post(
          "https://us-central1-suhail-f1d6e.cloudfunctions.net/endpoints/subtract",
          {
            num1: num1,
            num2: num2,
          }
        )
        .then((response) => {
          console.log(response.data.result);
          setResult("The answer is "+response.data.result);
        });
      }
      
    else if (operation == 2)  {
        axios
          .post(
            "https://us-central1-suhail-f1d6e.cloudfunctions.net/endpoints/multiply",
            {
              num1: num1,
              num2: num2,
            }
          )
          .then((response) => {
            console.log(response.data.result);
            setResult("The answer is "+response.data.result);
          });
        }  }


  return (
    <Background>
      <BackButton />
      <Text
        style={{
          fontSize: widthToDp("7%"),
          fontWeight: "bold",
          marginTop: heightToDp("15%"),
          color: "#fff",
          width: widthToDp("80%"),
        }}
      >
        Let's Calculate it.
      </Text>
      <Text
        style={{
          fontSize: widthToDp("6%"),
          color: "#fff",
          marginTop: heightToDp("2%"),
          width: widthToDp("80%"),
        }}
      >
        A Dummy Text.
      </Text>
      <View style={{ marginTop: heightToDp("5%") }} />
      <TextInput
        label="Enter First Number"
        returnKeyType="next"
        onChangeText={(text) => setNum1(text)}
        keyboardType="numeric"

      />
      <TextInput
        label="Enter Second Number"
        returnKeyType="next"
        onChangeText={(text) => setNum2(text)}
        keyboardType="numeric"

      />
      <ModalDropdown
      defaultValue="Select An Operation"
      style={{borderWidth: 1,borderColor: "#7E7F8B",marginTop: heightToDp("6%"), borderRadius: widthToDp("4%"),backgroundColor: "#191720", padding: widthToDp('4%'), width: widthToDp("82%")}}
      textStyle={{fontSize: 15, color : "#7E7F8B"}}
        dropdownStyle={{ width: widthToDp("100%") }}
        onSelect={(value) => setOperation(value)}
        options={["Addition", "Subtraction", "Multiplication"]}
      />
        {/* <View style={{}}>
          <Text style={{fontSize: 15, color : "#7E7F8B"}}>Select An Operation</Text>
        </View> */}

      <Text style={{marginTop: heightToDp("5%"),color :theme.colors.error, marginBottom: heightToDp("5%")}}>{result}</Text>

      <TouchableOpacity
        style={{ marginTop: heightToDp("-1%") }}
        onPress={getdata}
      >
        <View
          style={{
            width: widthToDp("80%"),
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: widthToDp("3.5%"),
          }}
        >
          <Text style={{ color: "#191720", fontSize: widthToDp("4.5") }}>
            Calculate
          </Text>
        </View>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    color: "#fff",
  },
});
