export const formatAmount = (amount) => {
    const formattedValue = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  
    return formattedValue;
  };