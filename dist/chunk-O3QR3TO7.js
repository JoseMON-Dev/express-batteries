// src/functions/isValibotSchema.ts
function isValibotSchema(obj) {
  return obj.kind === "schema";
}

export {
  isValibotSchema
};
