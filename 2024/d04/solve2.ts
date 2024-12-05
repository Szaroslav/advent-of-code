function search(wordToSearch: string, input: string[][]): number {
  wordToSearch = wordToSearch.toUpperCase();
  const wordsToSearch = [
    wordToSearch,
    wordToSearch.split("").reverse().join(""),
  ];
  const W = wordToSearch.length;
  const N = input.length;

  let wordCount = 0;

  for (let i = 0; i < N - (W - 1); i++) {
    const M = input[i].length;
    for (let j = 0; j < M - (W - 1); j++) {
      const rows = input.slice(i, i + W);

      const diagonalWordTb = rows.map((row, k) => row[j + k]).join("");
      const diagonalWordBt = rows
        .reverse()
        .map((row, k) => row[j + k])
        .join("");
      wordsToSearch.includes(diagonalWordTb) &&
        wordsToSearch.includes(diagonalWordBt) &&
        wordCount++;
    }
  }

  return wordCount;
}

async function solve() {
  const filePath = "./input.txt";

  try {
    const decoder = new TextDecoder("utf-8");
    const rawInput = await Deno.readFile(filePath);
    const input = decoder
      .decode(rawInput)
      .split("\n")
      .filter((row) => row)
      .map((row) => row.split(""));

    return search("MAS", input);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
