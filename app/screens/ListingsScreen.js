import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingApi from "../api/listings";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const { error, loading, data: listings, request: loadListings } = useApi(
    listingApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <Text>Couldn't retreive listings, please retry</Text>
            <Button title="retry" onPress={() => loadListings()} />
          </>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={`$${item.price}`}
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnailUrl}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
