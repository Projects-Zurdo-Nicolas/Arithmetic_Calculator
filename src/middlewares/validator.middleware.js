export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Valida `req.body` si `schema.body` existe

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  }
};
