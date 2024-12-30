import { useCustomContext } from '@/contexts/Context';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface CardProps {
  name: string;
  image: string;
  code: string;
  isNationalTeam: boolean;
}

const Card: React.FC<CardProps> = ({ name, image, code, isNationalTeam }) => {

  // const imageUrl = `https://image.tmdb.org/t/p/w500${item.image_path}`;  

  // console.log("Teams", name,image)
  const {increment} = useCustomContext();

  return (
    <View style={styles.card}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : (
        null
      )}
      <View style={styles.texts}>

        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>
          {code ? code : 'No description available.'}
        </Text>
        <Text style={styles.tag}>
          {isNationalTeam ? 'National Team' : 'Club Team'}
        </Text>
        {/* <Text style={styles.status}>Release Date: {item.release_date}</Text> */}

      </View>
      <View>
        <TouchableOpacity 
          style={{
            flexDirection: 'row',
            width:30,
            height:30, 
            alignItems: 'center', 
            justifyContent:'center',
            marginTop: 10, 
            backgroundColor: '#0092b2', 
            padding: 10, borderRadius: 10,}}  
            onPress={increment}
            >
          <FontAwesome style={{alignItems:"center"}} name="plus" size={10} color={"white"}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center', // Centering the image and text
  },
  texts:{
    flexDirection: "column",
    alignItems:"center",
    paddingEnd:10
  },
  image: {
    width: 80,
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 8,
    textAlign: 'center',
  },
  tag: {
    fontSize: 12,
    color: '#757575',
  },
});

export default Card;
