function isReportSafe(report: number[]): boolean {
  if (report.length <= 1) {
    return true;
  }

  const isAscending = report[1] - report[0] > 0;

  for (let i = 1; i < report.length; i++) {
    const relativeDistance = report[i] - report[i - 1];
    const distance = Math.abs(relativeDistance);

    const isSafe =
      distance >= 1 &&
      distance <= 3 &&
      ((isAscending && relativeDistance > 0) ||
        (!isAscending && relativeDistance < 0));

    if (!isSafe) {
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
    const decodedInput = decoder.decode(rawInput);
    const input = decodedInput
      .split("\n")
      .filter((tuple) => tuple)
      .map((tuple) => tuple.split(/\s+/).map(Number));

    let safeReportCount = 0;

    for (const report of input) {
      for (let i = -1; i < report.length; i++) {
        const currentReport = [
          ...report.slice(0, Math.max(i, 0)),
          ...report.slice(i + 1),
        ];
        if (isReportSafe(currentReport)) {
          safeReportCount++;
          break;
        }
      }
    }

    return safeReportCount;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

console.log(await solve());
