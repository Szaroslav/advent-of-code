function search(wordToSearch: string, input: string[][]): number {
  wordToSearch = wordToSearch.toUpperCase();
  const wordsToSearch = [
    wordToSearch,
    wordToSearch.split("").reverse().join(""),
  ];
  const W = wordToSearch.length;
  const N = input.length;

  let wordCount = 0;

  for (let i = 0; i < N; i++) {
    const M = input[i].length;
    for (let j = 0; j < M; j++) {
      if (j + (W - 1) < M) {
        const horizontalWord = input[i].slice(j, j + W).join("");
        wordsToSearch.includes(horizontalWord) && wordCount++;
      }

      if (i + (W - 1) < N) {
        const verticalWord = input
          .slice(i, i + W)
          .map((row) => row[j])
          .join("");
        wordsToSearch.includes(verticalWord) && wordCount++;
      }

      if (j + (W - 1) < M && i + (W - 1) < N) {
        const rows = input.slice(i, i + W);

        const diagonalWordTb = rows.map((row, k) => row[j + k]).join("");
        wordsToSearch.includes(diagonalWordTb) && wordCount++;

        const diagonalWordBt = rows
          .reverse()
          .map((row, k) => row[j + k])
          .join("");
        wordsToSearch.includes(diagonalWordBt) && wordCount++;
      }
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

    return search("XMAS", input);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
