/**
 * Return the available payment options for given checkout
 */
function getPaymentOptions(checkout) {
    return [
        {
            id: 'bankTransfer',
            label: {
                en: 'Bank Transfer',
                es: 'Transferencia Bancaria'
            }
        },
        {
            id: 'deliveryPayment',
            label: {
                en: 'Payment on delivery',
                es: 'Pago en delivery'
            }
        }
    ];
}

/**
 * Exports
 */
export {getPaymentOptions};
