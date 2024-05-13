export default function formatNumber(price) {
  if (price !== undefined && price !== null) {
    const isNegative = price < 0; // Verificar se o número é negativo
    const absolutePrice = Math.abs(price); // Obter o valor absoluto do preço

    const priceString = absolutePrice.toString();
    let integerPart;
    let decimalPart = '00'; // Define '00' como parte decimal padrão

    // Verificar se o preço tem seis dígitos
    if (priceString.length === 6) {
      integerPart = priceString.substring(0, 1); // Primeiro dígito como parte inteira
      const middleDigits = priceString.substring(1, 4); // Três dígitos do meio como parte inteira
      integerPart += (middleDigits !== '000') ? `,${middleDigits}` : ''; // Adiciona os dígitos do meio, se não forem todos zeros
      decimalPart = priceString.substring(4); // Os dois últimos dígitos como parte decimal
    } else {
      integerPart = priceString.substring(0, priceString.length - 2); // Todos os dígitos, exceto os dois últimos, como parte inteira
      decimalPart = priceString.substring(priceString.length - 2); // Os dois últimos dígitos como parte decimal
    }

    // Adicionar o separador de milhares, se necessário
    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Adicionar o sinal de menos se o número for negativo
    const formattedIntegerPart = isNegative ? `-${integerPart}` : integerPart;

    return `${formattedIntegerPart}.${decimalPart}`;
  }
  return '';
}
