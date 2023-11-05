// import { StatusBar } from 'expo-status-bar';
// import axios from 'axios';
// import React, { Fragment, Component } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Button,
//   Text


// } from 'react-native';

// // import {Loader} from'./additions/Loader.jsx'

// let end = 0;
// const data =[
//   {
// time: new Date('2022-04-24'),
// text:"Я щас тут в такому цікавенькому місці", 
// title:"Добрий вечір, студія 2022-04-24" }, 
// {
//   time: new Date('2022-04-23'),
//   text:"Я щас тут в такому цікавенькому місці", 
//   title:"Добрий вечір, студія 2022-04-23" },
//   {
//     time: new Date('2022-04-22'),
//     text:"Я щас тут в такому цікавенькому місці", 
//     title:"Добрий вечір, студія 2022-04-22" },
//     {
//       time: new Date('2022-04-21'),
//       text:"Я щас тут в такому цікавенькому місці", 
//       title:"Добрий вечір, студія 2022-04-21" },
//       {
//         time: new Date('2022-04-20 '),
//         text:"Я щас тут в такому цікавенькому місці", 
//         title:"Добрий вечір, студія 2022-04-20" }
// ]
// const Col = ({ numRows, children }) => {
//   return  (
//     <View style={styles[`${numRows}col`]}>{children}</View>
//   )
// }
// const Row = ({ children }) => (
//   <View style={styles.row}>{children}</View>
// )


// export default function App() {

//   data.sort((a, b) => a.time.getTime() - b.time.getTime())
  

//   return (
//     <View style={styles.container}>
//       {/* <Loader/> */}
//       {/* <Text>Hi</Text> */}
//       <View style={styles.app} >
//       <Row>
//       {data.map((news) =>
//         <Col numRows={2}> 
//           <Text style={styles.news} key={news.time} >{news.title}
//               <View>
//                   <Text>{news.text}</Text>
//               </View>
//           </Text>
//         </Col>
//         )} 
//         </Row>
//       </View>
//       <StatusBar style="auto" />


//       <View style={styles.app}>
//       <Row>
//         <Col numRows={2}>
//           <Text>First column</Text>
//         </Col>
//         <Col numRows={2}>
//           <Text>Second column</Text>
//         </Col>
//       </Row>
//       {/* <Row>
//         <Col numRows={1}>
//           <Text>First column</Text>
//         </Col>
//         <Col numRows={3}>
//           <Text>Second Column</Text>
//         </Col>
//       </Row> */}
//     </View>


//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 30  ,
//     display: 'flex',
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   news:{
//     display: 'flex',
//     marginBottom: 5, 
//   },
//   app: {
//     flex: 2, // the number of columns you want to devide the screen into
//     marginHorizontal: "auto",
//     width: 385,
//     backgroundColor: "#fff"
//   },
//   row: {
//     flexDirection: "row"
//   },
//   "1col":  {
//     backgroundColor:  "lightblue",
//     borderColor:  "#fff",
//     borderWidth:  1,
//     flex:  1
//   },
//   "2col":  {
//     backgroundColor:  "green",
//     borderColor:  "#fff",
//     borderWidth:  1,
//     flex:  2
//   },
//   // "3col":  {
//   //   backgroundColor:  "orange",
//   //   borderColor:  "#fff",
//   //   borderWidth:  1,
//   //   flex:  3
//   // },
//   // "4col":  {
//   //   flex:  4
//   // }
// });
// import React from 'react';
// import { Navigation } from './screens/Navigation';

// export default function App() {
//   return <Navigation />;
// }
// import {AppRegistry} from 'react-native';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { View, Text, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
// import { ListItem, Avatar, SearchBar } from 'react-native-elements';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/stack';


// const Stack = createNativeStackNavigator();

// function ArticlesList({ navigation }) {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   const fetchArticles = () => {
//     setLoading(true);
//     axios
//       .get(`https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&apiKey=9c4b6caedb7e40c38d9283a2fa439b83`)
//       .then((response) => {
//         setArticles(response.data.articles);
//         setLoading(false);
//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(fetchArticles, [search]);

//   const updateSearch = (search) => {
//     setSearch(search);
//   };

//   const renderItem = ({ item }) => (
//     <ListItem bottomDivider onPress={() => navigation.navigate('Article', { article: item })}>
//       <Avatar source={{ uri: item.urlToImage }} />
//       <ListItem.Content>
//         <ListItem.Title>{item.title}</ListItem.Title>
//         <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
//       </ListItem.Content>
//     </ListItem>
//   );

//   if (loading) {
//     return (
//       <View>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View>
//       <SearchBar placeholder="Type Here..." onChangeText={updateSearch} value={search} lightTheme round />
//       <FlatList data={articles} renderItem={renderItem} keyExtractor={(item) => item.url} />
//     </View>
//   );
// }

// function Article({ route }) {
//   const { article } = route.params;

//   return (
//     <View>
//       <Text>{article.title}</Text>
//       <Avatar source={{ uri: article.urlToImage }} />
//       <Text>{article.description}</Text>
//       <Text>{article.author}</Text>
//       <Text>{article.publishedAt}</Text>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="ArticlesList" component={ArticlesList} options={{ title: 'Articles' }} />
//         <Stack.Screen name="Article" component={Article} options={{ title: 'Article Detail' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoanCalculator from './screens/LoanCalculator';
import AuthorScreen from './screens/Author';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoanCalculator" component={LoanCalculator} />
        <Stack.Screen name="Author" component={AuthorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
