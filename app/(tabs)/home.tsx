import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import Card from '../../components/Card'; // Import the Card component
import { useRoute } from '@react-navigation/native';
import { useCustomContext } from '@/contexts/Context';
import axios from "axios";

interface Team {
  id: number;
  name: string;
  image_path: string;
  code: string;
  national_team: boolean;
}

const HomePage = () => {
  const [data, setData] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  
  const {count} = useCustomContext();

  const API_TOKEN = "pIO7ymZziPnKhqLH6e9O1iDxiyfFbAhXINMYnVrVgN6AoNQ7De0mE1nBdyRM"
  const API_URL = `https://cricket.sportmonks.com/api/v2.0/teams?api_token=${API_TOKEN}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://cricket.sportmonks.com/api/v2.0/teams",{
          params:{
            api_token: API_TOKEN
          }
        })
        // console.log("API Response:", response.data);
        setData(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />

        <View style={{}}>
          <Text style={styles.textMain}>Hello, {username}</Text>
          {/* <Text style={styles.textSec}>Welc</Text> */}
        </View>
      </View>
      {data.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No teams available</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card 
              name={item.name}
              image={item.image_path}
              code={item.code}
              isNationalTeam={item.national_team} 
            />
          )}
        />
      )}
      <View 
        style={{ 
          position: 'absolute', 
          bottom: 10, right: 10, 
          backgroundColor: '#000000', 
          padding: 5, borderRadius: 10, 
          paddingHorizontal: 20}}
      >
        <Text style={styles.floating}>
          {count}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },  
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    margin:20,
    borderRadius: 10,
  },  textMain:{
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textSec:{
    fontSize: 20,
  },
  floating:{
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
    color: '#ffffff',
  },
});

export default HomePage;
