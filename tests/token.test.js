const config = require("./config");
const pagseguro = require("../src");

describe("Token", function () {
    test("success", async function () {
        const client = pagseguro.connect(config.pagseguro);
        const session = await client.session.get();
        const token = await client.token.get(Object.assign(config.card, { sessionId: session.content }));

        expect(typeof token).toEqual("object");
        expect(token).toHaveProperty("content");
        expect(token.content).toHaveProperty("token");
        expect(token.content.token).toHaveLength(32);
    });

    test("error", async function () {
        try {
            const configError = { ...config.pagseguro, email: "", token: "" };
            const client = pagseguro.connect(configError);
            const token = await client.token.get(config.card);
        } catch (e) {
            expect(typeof e).toEqual("object");
            expect(e).toHaveProperty("name", "PagseguroError");
            expect(e).toHaveProperty("status", "error");
            expect(e).toHaveProperty("statusCode", 401);
            expect(e).toHaveProperty("content");
            expect(Array.isArray(e.content)).toEqual(true);
        }
    });
});
