async function solve() {
  const filePath = "./input.txt";

  try {
    const decoder = new TextDecoder("utf-8");
    const rawInput = await Deno.readFile(filePath);
    const decodedInput = decoder.decode(rawInput);
    const input = decodedInput
      .split("\n")
      .filter((tuple) => tuple)
      .map((tuple) => tuple.split(/\s+/).map(Number));

    const secondListCounts = new Map<number, number>();

    input.forEach(([_, b]) =>
      secondListCounts.set(b, (secondListCounts.get(b) ?? 0) + 1)
    );

    return input
      .map(([a, b]) => a)
      .reduce(
        (accumulator, a) => accumulator + a * (secondListCounts.get(a) ?? 0),
        0
      );
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
