export default function formatNumber(price) {
  if (price !== undefined && price !== null) {
    const isNegative = price < 0;
    const absolutePrice = Math.abs(price);

    const priceString = absolutePrice.toString();
    let integerPart;
    let decimalPart = '00';

    if (priceString.length === 6) {
      integerPart = priceString.substring(0, 1);
      const middleDigits = priceString.substring(1, 4);
      integerPart += (middleDigits !== '000') ? `,${middleDigits}` : '';
      decimalPart = priceString.substring(4);
    } else {
      integerPart = priceString.substring(0, priceString.length - 2);
      decimalPart = priceString.substring(priceString.length - 2);
    }

    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const formattedIntegerPart = isNegative ? `-${integerPart}` : integerPart;

    return `${formattedIntegerPart}.${decimalPart}`;
  }
  return '';
}
