// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// // import ContactsWrapper from 'react-native-contacts-wrapper';
// import * as Contacts from 'expo-contacts';

// const ContactsScreen = () => {
//     const [contacts, setContacts] = useState();

//     const loadContacts = async () => {
//         try {
//             const contactsData = await ContactsWrapper.getContacts();
//             setContacts(contactsData);
//         } catch (error) {
//             console.log('Помилка отримання контактів:', error);
//         }
//     };

//     useEffect(() => {
//         (async () => {
//             const { status } = await Contacts.requestPermissionsAsync();
//             if (status === 'granted') {
//                 const { data } = await Contacts.getContactsAsync({
//                     fields: [Contacts.Fields.PhoneNumbers]
//                 })
//                 if (data.length > 0) {
//                     setContacts(data);
//                 }
//             }
//         })()
//     })

//     return (
//         <View style={styles.container}>
//             <Text>Імена контактів:</Text>
//             <FlatList
//             style={{width:'100%'}}
//                 data={contacts}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => <View>
//                     <Text>{item.name}</Text>
//                     <Text>{item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}</Text>
//                 </View>}
//             />
//             <Button title="Оновити контакти" onPress={loadContacts} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default ContactsScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function ContactsScreen() {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                    setContacts(data)
                    console.log(data[0]);
                }
            }
        })();
    }, []);

    const filteredContacts = contacts.filter(contact => contact.firstName && contact.firstName.toLowerCase().endsWith('а'));


    return (
        <View style={styles.container}>
            <Text>Імена контактів:</Text>
            <FlatList
                style={{ width: '100%' }}
                data={contacts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <View>
                    <Text>{item.firstName}</Text>
                </View>}
            />
            <Text>Імена контактів (закінчені на "а"):</Text>

            <FlatList
                style={{ width: '100%' }}
                data={filteredContacts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.firstName}</Text>
                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
