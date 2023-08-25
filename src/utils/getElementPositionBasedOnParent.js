const getElementPositionBasedOnParent = ({
  items,
  selectedItem,
  currentItem
}) => {
  const indexSelectedItem = items.findIndex(item => item === selectedItem);
  const indexCurrentItem = items.findIndex(item => item === currentItem);

  if (indexSelectedItem === -1 || indexCurrentItem === -1) {
    return 0;
  }

  if (indexCurrentItem < indexSelectedItem) {
    return -1;
  }

  if (indexCurrentItem > indexSelectedItem) {
    return 1;
  }

  return 0;
};

export default getElementPositionBasedOnParent;
