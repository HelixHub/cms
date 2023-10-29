if (!process.env.NEXT_PUBLIC_API_HOST) {
    throw new Error("No api host defined");
}

// Map config object for easier access
const config = {
    api: {
        host: process.env.NEXT_PUBLIC_API_HOST,
    },
};

export default config;