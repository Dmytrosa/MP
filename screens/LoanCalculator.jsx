// import { View, Text, TextInput, Button } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import AuthorScreen from './Author'; 
// import { useState } from 'react';


// const Calculator = () => {
//   const [number1, setNumber1] = useState('');
//   const [number2, setNumber2] = useState('');
//   const [selectedBase, setSelectedBase] = useState('2');
//   const [selectedOperation, setSelectedOperation] = useState('+');
//   const [result, setResult] = useState('');
//   const [selectedResultBase, setSelectedResultBase] = useState('2');
//   const navigation = useNavigation();

//   const calculateResult = () => {
//     let num1 = parseInt(number1, parseInt(selectedBase));
//     let num2 = parseInt(number2, parseInt(selectedBase));
//     let res = 0;
//     switch (selectedOperation) {
//       case '+':
//         res = num1 + num2;
//         break;
//       case '-':
//         res = num1 - num2;
//         break;
//       case '*':
//         res = num1 * num2;
//         break;
//       case '/':
//         res = num1 / num2;
//         break;
//       default:
//         break;
//     }
//     setResult(res.toString());
//   };

//   const convertBase = (number) => {
//     return parseInt(number, 10).toString(parseInt(selectedResultBase));
//   };

//   const bases = ["2", "8", "10", "16"];

//   const saveToFile = async () => {
//     try {
//       const content = {
//         number1,
//         number2,
//         selectedBase,
//         selectedOperation,
//         result,
//         selectedResultBase,
//       };
//       const fileUri = `${FileSystem.documentDirectory}/calculator_data.json`;
//       await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content));
//       console.log('Data saved to file.');
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   const loadFromFile = async () => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}/calculator_data.json`;
//       const content = await FileSystem.readAsStringAsync(fileUri);
//       const data = JSON.parse(content);
//       setNumber1(data.number1);
//       setNumber2(data.number2);
//       setSelectedBase(data.selectedBase);
//       setSelectedOperation(data.selectedOperation);
//       setResult(data.result);
//       setSelectedResultBase(data.selectedResultBase);
//       console.log('Data loaded from file.');
//     } catch (error) {
//       console.error('Error loading data:', error);
//     }
//   };

//   const goToAuthor = () => {
//     navigation.navigate('Author'); 
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <View style={{paddingBottom: 50}}>
//       <Button  title='Author' onPress={goToAuthor}/>
//       </View>
//       <Picker
//         selectedValue={selectedBase}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue) => setSelectedBase(itemValue)}
//       >
//         <Picker.Item label="Binary" value="2" />
//         <Picker.Item label="Octal" value="8" />
//         <Picker.Item label="Decimal" value="10" />
//         <Picker.Item label="Hexadecimal" value="16" />
//       </Picker>
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, width: 200 }}
//         onChangeText={(text) => setNumber1(text)}
//         value={number1}
//         placeholder={`Enter number in base ${selectedBase}`}
//       />
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, width: 200 }}
//         onChangeText={(text) => setNumber2(text)}
//         value={number2}
//         placeholder={`Enter number in base ${selectedBase}`}
//       />
//       <Picker
//         selectedValue={selectedOperation}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue) => setSelectedOperation(itemValue)}
//       >
//         <Picker.Item label="+" value="+" />
//         <Picker.Item label="-" value="-" />
//         <Picker.Item label="*" value="*" />
//         <Picker.Item label="/" value="/" />
//       </Picker>
//       <Text style={{ margin: 10 }}>Result: {result}</Text>
//       <Picker
//         selectedValue={selectedResultBase}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue) => setSelectedResultBase(itemValue)}
//       >
//         {bases.map((base) => (
//           <Picker.Item key={base} label={`Base ${base}`} value={base} />
//         ))}
//       </Picker>
//       <Text style={{ margin: 10 }}>
//         Converted Result: {result ? convertBase(result) : ''}
//       </Text >
//       <View style={{display:'flex', flexDirection:'row'}}>
//         <View style={{ margin:5}}>
//       <Button color="#0000ff" title="Calculate" onPress={calculateResult} />
//       </View>
//       <View style={{ margin:5}}>
//       <Button title="Save to File" onPress={saveToFile} />
//       </View>
//       <View style={{ margin:5}}>
//       <Button title="Load from File" onPress={loadFromFile} />
//       </View>
//       </View>
//     </View>
//   );
// };

// export default Calculator;

import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('Program 1');
  const [result, setResult] = useState('');
  const [chartData, setChartData] = useState([]); 
  const [chartLabels, setchartLabels] = useState([]); 

  const navigation = useNavigation();

  const handleCalculate = () => {
    let totalDebt = 0;
    let principal = parseFloat(loanAmount);
    const payment = parseFloat(paymentAmount);
    const data = [];
    const labels = [];
console.log("------")
    if (selectedProgram === 'Program 1') {
      // Calculation for Program 1 (Simple Interest)
      const interestRate = 0.1; // 10% annual interest rate
      const periods = 12; // 1 year
      for (let i = 0; i < periods; i++) {
        principal -= payment;
        data.push(totalDebt);
        labels.push(i)
        totalDebt += principal * interestRate;
        if (principal <= 0) break;
      }
    } else if (selectedProgram === 'Program 2') {
      // Calculation for Program 2 (Compound Interest)
      const interestRate = 0.08; // 8% annual interest rate
      var totalPeriods = 12; // 1 year
      const compoundInterest = principal * Math.pow(1 + interestRate, totalPeriods);
      totalDebt = compoundInterest - payment;
      
      for (let i = 0; i < totalPeriods; i++) {
        totalDebt = principal * (1 + interestRate);
        principal -= payment;
        data.push(totalDebt);
        labels.push(i)
        if (principal <= 0) break;
      }
    } else if (selectedProgram === 'Program 3') {
      // Calculation for Program 3 (Amortized Loan)
      const interestRate = 0.06; // 6% annual interest rate
      const periods = 12; 
      const monthlyInterestRate = interestRate / periods;
      var totalPeriods = 5 * periods; // 5 years
      const power = Math.pow(1 + monthlyInterestRate, totalPeriods);
      totalDebt = principal * (monthlyInterestRate * power) / (power - 1) - payment;
      for (let i = 0; i < totalPeriods; i++) {
        const princ =  principal;
        data.push(totalDebt - i * payment);
        labels.push(i)
      }
    }
    setChartData(data.reverse());
    setchartLabels(labels)
    setResult(`Total Debt: ${totalDebt.toFixed(2)}`);
  };

  const saveToFile = async () => {
    try {
      const content = {
        selectedProgram,
        loanAmount,
        paymentAmount,
      };
      const fileUri = `${FileSystem.documentDirectory}/loans_data.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content));
      console.log('Data saved to file.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadFromFile = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}/loans_data.json`;
      const content = await FileSystem.readAsStringAsync(fileUri);
      const data = JSON.parse(content);
      setSelectedProgram(data.selectedProgram);
      setLoanAmount(data.loanAmount);
      setPaymentAmount(data.paymentAmount);
      console.log('Data loaded from file.');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const goToAuthor = () => {
    navigation.navigate('Author');
  };


  const info =  {
    labels : chartLabels,
    datasets: [{data : chartData}]
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ paddingBottom: 50 }}>
        <Button title='Author' onPress={goToAuthor} />
      </View>
      <Text>Select a Credit Program:</Text>
      <Picker
        selectedValue={selectedProgram}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setSelectedProgram(itemValue)}>
        <Picker.Item label="Simple Interest: 10%/y, 12 month" value="Program 1" />
        <Picker.Item label="Compound Interest: 8%/y, 12 month" value="Program 2" />
        <Picker.Item label="Amortized Loan: 8%/y, 5 year" value="Program 3" />
      </Picker>
      <TextInput
        style={{ margin: 10 }}
        // style={{ height: 50, width: 150 }}
        placeholder="Loan Amount"
        value={loanAmount}
        onChangeText={(text) => setLoanAmount(text)}
      />
      <TextInput
        style={{ margin: 10 }}
        // style={{ height: 50, width: 150 }}
        placeholder="Payment Amount"
        value={paymentAmount}
        onChangeText={(text) => setPaymentAmount(text)}
      />
      <Button title="Calculate" onPress={handleCalculate} />
      <Text>{result}</Text>
      <View style={{ margin: 5 }}>
        <Button title="Save to File" onPress={saveToFile} />
      </View>
      <View style={{ margin: 5 }}>
        <Button title="Load from File" onPress={loadFromFile} />
      </View>



      <View>
  <LineChart
    data={info.labels.length>0? info:{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>


    </View>
  );
};

export default LoanCalculator;


