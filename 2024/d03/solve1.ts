async function solve() {
  const filePath = "./input.txt";

  try {
    const decoder = new TextDecoder("utf-8");
    const rawInput = await Deno.readFile(filePath);
    const input = decoder.decode(rawInput);

    let accumulation = 0;

    for (const match of input.matchAll(/mul\((\d+),(\d+)\)/g)) {
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
