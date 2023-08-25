export default function ({ ofSelected, items }) {
  if (ofSelected) {
    const indexItem = items.findIndex(item => item.id === ofSelected);

    if (indexItem !== -1) {
      const of = items[indexItem];
      if (of.parts) {
        return of.parts;
      }
    }
  }
  return [];
}
