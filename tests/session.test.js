const config = require("./config");
const pagseguro = require("../src");

describe("Session", function() {
	test("success", async function() {
		const client = pagseguro.connect(config.pagseguro);
		const session = await client.session.get();

		expect(typeof session).toEqual("object");
		expect(session).toHaveProperty("content");
		expect(session.content).toHaveLength(32);
	});

	test("unauthorized", async function() {
		try {
			const configError = { ...config.pagseguro, email: "", token: "" };
			const client = pagseguro.connect(configError);
			const session = await client.session.get();
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
