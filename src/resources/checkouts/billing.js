/**
 * Return the available payment options for given checkout
 */
function getPaymentOptions(checkout) {
    return [
        {
            id: 'mercadopago',
            label: {
                es: 'Pago online mediante Mercado Pago',
                en: 'Payment through Mercado Pago'
            }
        },
        {
            id: 'paypal',
            label: {
                en: 'Payment on delivery',
                es: 'Pago online mediante Paypal (se necesita cuenta en Paypal)'
            }
        },
        {
            id: 'cash',
            label: {
                en: 'Payment on delivery',
                es: 'En efectivo. Pagás cuando recibís la mercadería'
            }
        }
    ];
}

/**
 * Exports
 */
export {getPaymentOptions};
