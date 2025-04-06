import ts from "typescript";
export default function transformer(program) {
    return (context) => {
        const visitor = (node) => {
            if (ts.isCallExpression(node)) {
                if (
                    ts.isPropertyAccessExpression(node.expression) &&
                    ts.isIdentifier(node.expression.expression) &&
                    node.expression.expression.text === "ExpressBatteriesTs" &&
                    node.expression.name.text === "name"
                ) {
                    if (node.typeArguments && node.typeArguments.length === 1) {
                        const typeArg = node.typeArguments[0];
                        if (
                            ts.isTypeReferenceNode(typeArg) &&
                            ts.isIdentifier(typeArg.typeName)
                        ) {
                            const typeName = typeArg.typeName.text;
                            return ts.factory.createStringLiteral(typeName);
                        }
                    }
                }
            }
            return ts.visitEachChild(node, visitor, context);
        };

        return (node) => ts.visitNode(node, visitor);
    };
}
