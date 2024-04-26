export default function formatNumber(price) {
  if (price !== undefined && price !== null) {
    const priceString = price.toString();
    let integerPart;
    let decimalPart = '00'; // Sets '00' as the default decimal part

    // Check if the price is six digits
    if (priceString.length === 6) {
      integerPart = priceString.substring(0, 1); // First digit as whole part
      const middleDigits = priceString.substring(1, 4); // Three middle digits as whole part
      integerPart += (middleDigits !== '000') ? `,${middleDigits}` : ''; // Adds the middle digits, if they are not all zeros
      decimalPart = priceString.substring(4); // The last two digits as a decimal part
    } else {
      integerPart = priceString.substring(0, priceString.length - 2); // All digits except the last two as an integer
      decimalPart = priceString.substring(priceString.length - 2); // Last two digits as decimal part
    }

    // Add the separator point, if necessary
    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return `${integerPart}.${decimalPart}`;
  }
  return '';
}
