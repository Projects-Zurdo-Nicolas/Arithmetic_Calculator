import Operation from "../models/operation.model.js";

export const getOperations = async (req, res) => {
  const opertaions = await Operation.find();
  res.json(opertaions);
};
export const getOperation = async (req, res) => {
    const operation = await Operation.findByType(req.params.type);
    if(!operation) return res.status(404).json({ message: 'Operation not found' })
    
    res.json(operation)
};
