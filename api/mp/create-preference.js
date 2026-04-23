module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const backendUrl =
    process.env.BACKEND_URL || "https://ecobackend888.onrender.com";

  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `https://${req.headers.host}`;

  const body = req.body || {};

  const payload = {
    productKey: "dr_joe_colecao",
    origin: "landing",
    siteUrl,
    utm: body.utm ?? null,
  };

  try {
    const backendRes = await fetch(
      `${backendUrl}/api/mp/create-preference`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await backendRes.json();
    return res.status(backendRes.status).json(data);
  } catch (err) {
    console.error("[mp/create-preference proxy] Erro:", err);
    return res.status(502).json({
      error: "INTERNAL_ERROR",
      message: "Erro ao conectar com o servidor de pagamento",
    });
  }
};
