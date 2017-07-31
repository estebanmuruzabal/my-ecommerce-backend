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
            id: 'creditcard',
            label: {
                en: 'Payment on delivery with cc',
                es: 'Con tarjeta de crédito. Pagás cuando recibís la mercadería'
            }
        },
        {
            id: 'cash',
            label: {
                en: 'Payment on delivery',
                es: 'Con efectivo. Pagás cuando recibís la mercadería'
            }
        }
    ];
}

/**
 * Exports
 */
export {getPaymentOptions};
