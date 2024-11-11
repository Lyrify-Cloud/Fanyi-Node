// server.js
import Fastify from 'fastify';
import lcache from "fastify-lcache";
import { Translate } from "./router.js";

const app = Fastify();
app.register(lcache, {
    ttlInMinutes: 5,
});

app.get('/', async (request, reply) => {
    return {
        "about": "Fanyi-Node, Developed by sipc.ink",
        "github": "https://github.com/Lyrify-Cloud/Fanyi-Node"
    };
});

app.get('/translate', async (request, reply) => {
    const { model, text, form, to } = request.query;
    if (!model || !text || !form || !to) {
        return reply.status(400).send({ error: "缺少必需的参数：model, text, form 或 to" });
    }
    try {
        const translationResult = await Translate(model, text, form, to);

        if (translationResult === null) {
            return reply.status(500).send({ error: "翻译失败" });
        }
        return JSON.parse(translationResult);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "翻译过程中发生错误" });
    }
});

const start = async () => {
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server running on http://localhost:3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
