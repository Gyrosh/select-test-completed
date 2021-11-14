// Function to format select data into groups by provided field
export const groupBy = (selectData, fieldKey) => {
    return selectData.reduce((result, currentValue) => {
      // If the group is already present for the field, push it to the array, else create an array and push the object
      (result[currentValue[fieldKey]] = result[currentValue[fieldKey]] || []).push(
        currentValue
      );
      return result;
    }, {}); // Initial result
  };