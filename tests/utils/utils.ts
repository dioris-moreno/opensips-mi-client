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
