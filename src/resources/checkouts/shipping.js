/**
 * Imports
 */
import {Checkout} from './models';

/**
 * Return the available shipping options for given checkout
 */
function getShippingOptions(checkout) {

    let options = [];

    if (new Checkout(checkout).getSubTotal() <= 150) {
        options.push({
            value: 'Free',
            name: {
                en: 'To take pick-up in our shop',
                es: 'A retirar en nuestro local'
            },
            price: 0,
            vat: 0,
            currency: 'ARS'
        },
        {
          value: 'Zona-1',
          name: {
            en: 'Shipping to address in Zone 1',
            es: 'Envio a domicilio en Zona 1'
          },
          price: 25.00,
          vat: 0,
          currency: 'ARS'
        },
        {
            value: 'Zona-2',
            name: {
              en: 'Shipping to address in Zone 2',
              es: 'Envio a domicilio en Zona 2'
            },
            price: 35.00,
            vat: 0,
            currency: 'ARS'
        }
      );
    } else {
        options.push({
          value: 'Free',
          name: {
              en: 'A retirar en nuestro local, calle Guemes 765. Lun a Vie de 07:30 a 12:30 o 17:00 a 20:30',
              es: 'A retirar en nuestro local, calle Guemes 765. Lun a Vie de 07:30 a 12:30 o 17:00 a 20:30'
          },
          price: 0,
          vat: 0,
          currency: 'ARS'
        },
        {
          value: 'Zona-1-free',
          name: {
              en: 'Envio gratis dentro del casco centrico. Todos los Lunes y Jueves de 14 a 16',
              es: 'Envio gratis dentro del casco centrico. Todos los Lunes y Jueves de 14 a 16'
          },
          price: 0,
          vat: 0,
          currency: 'ARS'
        },
        {
            value: 'Zona 2',
            name: {
              en: 'Shipping to address in Zone 2',
              es: 'Envio a domicilio en Zona 2'
            },
            price: 35.00,
            vat: 0,
            currency: 'ARS'
        }
      );
    }

    return options;
}

/**
 * Exports
 */
export {getShippingOptions};
