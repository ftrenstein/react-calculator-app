import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';

export default function App() {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');
  const hasOperator = (expression) => /[+\-*/]/.test(expression);
 
  const isValidExpression = (expression) => {
    const validPattern = /^-?(\d+|([+-/*]{2}))(?:[\d+\-*/]*|([+-/*]{2}))$/;
    return validPattern.test(expression);
  };

  
  
  const handlePress = (item) => {
    console.log('Button pressed', item);
    if (item === 'C') {
      setExpression(expression != '0' ? expression.slice(0, -1) : '0');
    } else if (item === 'AC') {
      setExpression('0');
      setResult('0');
    } else if (item === '=' && hasOperator(expression)) {
      const sanitizedExpression = expression
      .replace(/--/g, '+')           
      .replace(/\++/g, '+');
      if (!isValidExpression(sanitizedExpression)) {
        setResult('Error: Invalid expression');
      }
          else {
          try {
            setResult(eval(sanitizedExpression).toString());
          } catch (error) {
            setResult('Error: Calculating expression');
          }
          
        }
      } else if (item !=='=') {
        setExpression((prev) => prev === '0'  ? item : prev + item);
      }
  };

  return (
    <SafeAreaProvider>
    <View style={{ flex: 1 }}>
      <Appbar.Header  style= {styles.bar}>
        <Appbar.Content style= {styles.barContent} title= {'Calculator'}>  </Appbar.Content>
      </Appbar.Header>
      <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{expression}</Text>
            <Text style={styles.input}>{result}</Text>
          </View>
            <View style={styles.buttonContainer}>
            {['7', '8', '9',].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
              {['C', 'AC'].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonRedText}>{item}</Text>
              </TouchableOpacity>
            ))}
            </View>
            <View style={styles.buttonContainer}>
            {['4', '5', '6',].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
              {['+', '-'].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonWhiteText}>{item}</Text>
              </TouchableOpacity>
            ))}
            </View>
            <View style={styles.buttonContainer}>
            {['1', '2', '3',].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
              {['×', '/'].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() =>(item === '×'? handlePress('*') : handlePress(item))}>
                <Text style={styles.buttonWhiteText}>{item}</Text>
              </TouchableOpacity>
            ))}
            </View>
            <View style={styles.buttonContainer}>
            {['0', '.', '00',].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
              {['=',' '].map((item) => (
              <TouchableOpacity  
                key={item}
                style={styles.button}
                onPress={() => (item !== ' ' && handlePress(item))}>
                <Text style={styles.buttonWhiteText}>{item}</Text>
              </TouchableOpacity>
            ))}
            </View>
        </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#A0B9C8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#D0E7F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    alignItems: 'flex-end', 
  },
  input: {
    width: '100%',  
    fontSize: 30,
    color: '#000',
    textAlign: 'right',
  },

  buttonContainer: {
    flex: 0.10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#A0B9C8', 
    padding: 10,
    width: '100%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 30,
  },
  buttonRedText: {
    color: '#FF0000',
    fontSize: 20,
  },
  buttonWhiteText: {
    color: '#fff',
    fontSize: 20,
  },
});
