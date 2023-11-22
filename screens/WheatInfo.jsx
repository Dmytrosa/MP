import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// import ContactsWrapper from 'react-native-contacts-wrapper';



const mockContacts = [
  { id: '1', name: 'Анна' },
  { id: '2', name: 'Петро' },
  { id: '3', name: 'Олена' },
  { id: '4', name: 'Михайло' },
  { id: '5', name: 'Ірина' },
  // Додайте більше мокових контактів за необхідності
];


const WheatListScreen = () => {
  const [wheatData, setWheatData] = useState([]);
  const [averageProductionValue, setAverageProductionValue] = useState(null);
  const filteredContacts = mockContacts.filter(contact => contact.name.endsWith('а'));

  const fetchWheatData = useCallback(() => {
    fetch('http://192.168.0.125:3000/getAllWheat')
      .then((response) => response.json())
      .then((data) => setWheatData(data))
      .catch((error) => console.error('Error fetching wheat data:', error));
  }, []);

  const handleDeleteWheat = async (id) => {
    try {
      const response = await fetch(`http://192.168.0.125:3000/deleteWheat/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Wheat entry deleted successfully');
        fetchWheatData(); // Перезавантажте дані після видалення
      } else {
        console.error('Error deleting wheat entry');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  useEffect(() => {
    // Обчислити середнє значення productionValueUSD для відфільтрованих записів
    const filteredData = wheatData.filter((item) => item.productionValueUSD > 25000000);
    const sumProductionValue = filteredData.reduce((sum, item) => sum + item.productionValueUSD, 0);
    const averageValue = sumProductionValue / filteredData.length;
    setAverageProductionValue(averageValue);
  }, [wheatData]);

  const handleAverage = () => {
    return
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchWheatData();
    }, [fetchWheatData])
  );


  // if (Contacts) {
  //   Contacts.getAll((err, contacts) => {
  //     if (err) throw err;
  
  //     // Робіть щось з контактами тут
  //     console.log(contacts);
  //   });
  // } else {
  //   console.log('Бібліотека контактів не ініціалізована');
  // }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wheat Entries</Text>
      <FlatList
        data={wheatData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Y: {item.year}</Text>
            <Text>M: {item.productionTonnage}</Text>
            <Text>$: {item.productionValueUSD}</Text>
            <View style={styles.del}>
              <Button
                title="Delete"
                onPress={() => handleDeleteWheat(item._id)}
                color="red"
              />
            </View>
          </View>
        )}
      />
      <Text style={styles.header}>Massive harvests</Text>
      {averageProductionValue !== null && (
        <Text style={styles.averageText}>
          Average Production Value (USD): {averageProductionValue ? averageProductionValue.toFixed(2) : "0"}
        </Text>
      )}
      <FlatList
        data={wheatData.filter((item) => item.productionTonnage > 25000000)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Year: {item.year}</Text>
            <Text>Tonnage: {item.productionTonnage}</Text>
            {/* <Text>Value (USD): {item.productionValueUSD}</Text> */}
            <View style={styles.del}>
            </View>
          </View>
        )}
      />
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  del: {
    marginLeft: 10,
    marginRight: 10
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default WheatListScreen;
