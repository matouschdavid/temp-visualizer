export function fromOpenMapsBounds(bounds) {
  if (bounds == null)
    return { topLeft: { lat: 0, lng: 0 }, bottomRight: { lat: 0, lng: 0 } };
  return {
    topLeft: { lat: bounds.getNorthWest().lat, lng: bounds.getSouthEast().lng },
    bottomRight: {
      lat: bounds.getSouthEast().lat,
      lng: bounds.getNorthWest().lng,
    },
  };
}

export function fromGoogleMapsBounds(bounds) {
  if (bounds == null)
    return { topLeft: { lat: 0, lng: 0 }, bottomRight: { lat: 0, lng: 0 } };
  return {
    topLeft: {
      lat: bounds.getNorthEast().lat(),
      lng: bounds.getSouthWest().lng(),
    },
    bottomRight: {
      lat: bounds.getSouthWest().lat(),
      lng: bounds.getNorthEast().lng(),
    },
  };
}
