type Condition = {
    description: string;
    icon: string;
};

// WMO Weather interpretation codes (WW)

export const wmoWeatherMap: Record<number, Condition> = {
    0: {
        description: 'Cielo despejado',
        icon: 'clear-day',
    },
    1: {
        description: 'Principalmente despejado',
        icon: 'mostly-clear-day',
    },
    2: {
        description: 'Parcialmente nublado',
        icon: 'partly-cloudy-day',
    },
    3: {
        description: 'Nublado',
        icon: 'cloudy',
    },
    45: {
        description: 'Niebla',
        icon: 'cloud-fog',
    },
    48: {
        description: 'Niebla con cencellada',
        icon: 'cloud-fog',
    },
    51: {
        description: 'Llovizna ligera',
        icon: 'cloud-drizzle',
    },
    53: {
        description: 'Llovizna moderada',
        icon: 'cloud-drizzle',
    },
    55: {
        description: 'Llovizna densa',
        icon: 'cloud-drizzle',
    },
    56: {
        description: 'Llovizna helada ligera',
        icon: 'cloud-hail',
    },
    57: {
        description: 'Llovizna helada densa',
        icon: 'cloud-hail',
    },
    61: {
        description: 'Lluvia ligera',
        icon: 'cloud-rain',
    },
    63: {
        description: 'Lluvia moderada',
        icon: 'cloud-rain',
    },
    65: {
        description: 'Lluvia fuerte',
        icon: 'cloud-rain-wind',
    },
    66: {
        description: 'Lluvia helada ligera',
        icon: 'cloud-hail',
    },
    67: {
        description: 'Lluvia helada fuerte',
        icon: 'cloud-hail',
    },
    71: {
        description: 'Nevada ligera',
        icon: 'cloud-snow',
    },
    73: {
        description: 'Nevada moderada',
        icon: 'cloud-snow',
    },
    75: {
        description: 'Nevada fuerte',
        icon: 'snowflake',
    },
    77: {
        description: 'Granos de nieve',
        icon: 'snowflake',
    },
    80: {
        description: 'Chubascos de lluvia ligeros',
        icon: 'cloud-sun-rain',
    },
    81: {
        description: 'Chubascos de lluvia moderados',
        icon: 'cloud-rain',
    },
    82: {
        description: 'Chubascos de lluvia violentos',
        icon: 'cloud-rain-wind',
    },
    85: {
        description: 'Chubascos de nieve ligeros',
        icon: 'cloud-snow',
    },
    86: {
        description: 'Chubascos de nieve fuertes',
        icon: 'cloud-snow',
    },
    95: {
        description: 'Tormenta eléctrica ligera o moderada',
        icon: 'cloud-lightning',
    },
    96: {
        description: 'Tormenta eléctrica con granizo ligero',
        icon: 'cloud-lightning-rain',
    },
    99: {
        description: 'Tormenta eléctrica con granizo fuerte',
        icon: 'cloud-lightning-rain',
    },
};

export function getWeatherCondition(code: number): Condition {
    return (
        wmoWeatherMap[code] ?? {
            description: 'Condición desconocida',
            icon: 'help-circle',
        }
    );
}
