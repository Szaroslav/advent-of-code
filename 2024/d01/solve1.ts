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

    const firstList = input.map(([a, _]) => a).sort();
    const secondList = input.map(([_, b]) => b).sort();

    const distances = firstList.map((id, i) => Math.abs(id - secondList[i]));

    return distances.reduce(
      (accumulator, distance) => accumulator + distance,
      0
    );
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
