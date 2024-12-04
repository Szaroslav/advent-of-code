async function solve() {
  const filePath = "./input.txt";

  try {
    const decoder = new TextDecoder("utf-8");
    const rawInput = await Deno.readFile(filePath);
    const input = decoder.decode(rawInput);

    const matches = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
    let isAccumulationEnabled = true;
    let accumulation = 0;

    for (const match of matches) {
      if (match[0] === "do()") {
        isAccumulationEnabled = true;
      } else if (match[0] === "don't()") {
        isAccumulationEnabled = false;
      }

      if (!isAccumulationEnabled || !match[0].startsWith("mul")) {
        continue;
      }

      const a = Number(match[1]);
      const b = Number(match[2]);
      accumulation += a * b;
    }

    return accumulation;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
