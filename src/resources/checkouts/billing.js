/**
 * Return the available payment options for given checkout
 */
function getPaymentOptions(checkout) {
    return [
        {
            id: 'mercadopago',
            label: {
                es: 'Pago online mediante Mercado Pago (Tarjeta de Crédito o Débito)',
                en: 'Payment through Mercado Pago'
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
