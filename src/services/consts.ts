console.log("%c[process.env.APP_ENV]", "color:#1E90FF;", process.env.APP_ENV);

const isProd = process.env.APP_ENV === "production";
const isTest = process.env.APP_ENV === "test";
const isUat = process.env.APP_ENV === "uat";
const isDev = process.env.APP_ENV === "dev";

export const solanaAlchemyUrl =
    isUat || isProd
        ? ``
        : `https://solana-devnet.g.alchemy.com/v2/Nuzx3_dbDwcAcrEnQ7cvDG7VLeB_2pT4`;

export const solanaAPIUrl =
    isUat || isProd
        ? `https://api.mainnet.solana.com`
        : `https://api.devnet.solana.com`;
