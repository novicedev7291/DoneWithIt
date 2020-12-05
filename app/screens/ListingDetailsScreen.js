import React from "react";
import { View, StyleSheet } from "react-native";

import { Image } from "react-native-expo-image-cache";

import Text from "../components/Text";
import colors from "../config/colors";
import { ListItem } from "../components/lists";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <View>
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        uri={listing.images[0].url}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>{`$${listing.price}`}</Text>
      </View>
      <ListItem
        image={require("../assets/mosh.jpg")}
        title="Kuldeep Yadav"
        subTitle="5 Listings"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
});

export default ListingDetailsScreen;
