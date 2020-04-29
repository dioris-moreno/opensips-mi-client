export const MIN_LOG_LEVEL = -3;
export const MAX_LOG_LEVEL = 4;

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomLogLevel = () => {
    return getRandomInt(MIN_LOG_LEVEL, MAX_LOG_LEVEL);
};

export const L_ALERT = -3;
export const L_CRIT = -2;
export const L_ERR = -1;
export const L_WARN = 1;
export const L_NOTICE = 2;
export const L_INFO = 3;
export const L_DBG = 4;
