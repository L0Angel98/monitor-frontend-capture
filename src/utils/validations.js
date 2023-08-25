import getWorkstationsFromOf from "../pages/SelectParts/getWorkstationsFromOf";

export const validationValue = (value, valueDefault) => {
  return value ? value : valueDefault;
};

export const showNameWorkstation = ({ name, alias }) => {
  return alias ? alias : name;
};

export const shortName = name => {
  if (name) {
    const nameSplit = name.split(" ");
    return nameSplit.slice(0, 2).join(" ");
  }
  return null;
};

export const createOptionsParts = parts => {
  return parts.map(part => ({
    value: part.id,
    label: `${part.name} ${part.code}`
  }));
};

export const createOptionsOfs = ofs => {
  return ofs.map(of => ({
    value: of.id,
    label: of.name
  }));
};

export const modalConfirmPartsShowValidations = ({
  form,
  partsQuantity = 1,
  includeOfs
}) => {
  let hasMainPart = form.main.part;

  if (includeOfs) {
    hasMainPart = hasMainPart && form.main.of;
  }

  if (partsQuantity == 1) {
    return hasMainPart;
  }

  let hasSecundaryPart = form.secondary.part;

  if (includeOfs) {
    hasSecundaryPart = hasSecundaryPart && form.secondary.of;
  }

  return hasMainPart && hasSecundaryPart;
};

export const handlePartsList = ({ items, ofSelected, hasOfs }) => {
  return hasOfs ? getWorkstationsFromOf({ ofSelected, items }) : items;
};

export const handleOfsList = ({ items, hasOfs }) => {
  return hasOfs ? items : [];
};

export const excludeById = (dataToExclude = []) => {
  return element =>
    !dataToExclude
      .filter(item => item != null && item != undefined)
      .includes(element.id);
};
