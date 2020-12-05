import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const postListing = (listing, onProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("description", listing.description);
  data.append("categoryId", listing.category.value);

  listing.images.forEach((uri) =>
    data.append("images", {
      name: `${new Date().getTime()}.jpg`,
      type: "image/jpeg",
      uri,
    })
  );

  if (listing.location) {
    data.append("location", JSON.stringify(listing.location));
  }

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onProgress(progress.loaded / progress.total),
  });
};

export default {
  getListings,
  postListing,
};
