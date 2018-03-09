import fastify from "fastify";

const app = fastify();

app.get("/", async (req, res) => ({
  data: {
    message: "Hello"
  }
}));

app.get("/oleg", async (req, resp) => {
  return {
    name: "Helgi"
  };
});

app.route({
  method: "GET",
  url: "/some",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" }
        }
      }
    },
    async beforeHandler(req, resp) {
      console.log("SUKa");
    }
  },
  async handler(req, resp) {
    return {
      hello: "MOTHERFUCR"
    };
  }
});

async function main() {
  try {
    await app.listen(3000);
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main().catch(console.error);
