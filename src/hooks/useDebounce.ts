'use client'
import { useState, useEffect } from 'react';

/**
 * Hook que retorna un valor debounced.
 *
 * Este hook recibe un valor y un retraso (en milisegundos) y retorna el valor
 * solo despues de que haya pasado el tiempo de retraso sin que el valor haya cambiado.
 * Es util para manejar eventos que ocurren rapidamente, como entradas de usuario,
 * y realizar acciones despues de que el usuario ha dejado de interactuar por un tiempo.
 *
 * @param {T} value - El valor que se va a debouncear.
 * @param {number} [delay=500] - El tiempo de retraso en milisegundos.
 * @returns {T} - El valor debounced.
 *
 * @example
 * const debouncedValue = useDebounce(inputValue, 500);
 * useEffect(() => {
 *   // Llamada a la API o alguna accion con debouncedValue
 * }, [debouncedValue]);
 */

export default function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}