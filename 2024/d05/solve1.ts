function isValidPageOrderingRule(
  update: number[],
  rule: [number, number]
): boolean {
  const [x, y] = rule;
  return update.indexOf(y) > update.indexOf(x);
}

function isValidOrder(
  update: number[],
  orderingRules: [number, number][]
): boolean {
  for (const rule of orderingRules) {
    if (!isValidPageOrderingRule(update, rule)) {
      return false;
    }
  }

  return true;
}

async function solve() {
  const filePath = "./input.txt";

  try {
    const decoder = new TextDecoder("utf-8");
    const rawInput = await Deno.readFile(filePath);
    const input = decoder
      .decode(rawInput)
      .split("\n\n")
      .map((inputPart) => inputPart.trim().split("\n"));
    const [orderingRules, updates] = [
      input[0].map<[number, number]>((tuple) => {
        const numericTuple = tuple.split("|").map(Number);
        return [numericTuple[0], numericTuple[1]];
      }),
      input[1].map((tuple) => tuple.split(",").map(Number)),
    ];

    let accumulation = 0;

    for (const update of updates) {
      const applicableOrderingRules = orderingRules.filter(
        ([x, y]) => update.includes(x) && update.includes(y)
      );
      if (isValidOrder(update, applicableOrderingRules)) {
        accumulation += update[Math.floor(update.length / 2)];
      }
    }

    return accumulation;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
