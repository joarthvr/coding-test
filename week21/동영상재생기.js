function solution(video_len, pos, op_start, op_end, commands) {
  const toSeconds = (time) => time.split(":").reduce((m, s) => m * 60 + +s, 0);
  const toTimeString = (seconds) =>
    [Math.floor(seconds / 60), seconds % 60]
      .map((n) => n.toString().padStart(2, "0"))
      .join(":");

  const vidLenSec = toSeconds(video_len);
  const opStartSec = toSeconds(op_start);
  const opEndSec = toSeconds(op_end);
  let curPosSec = toSeconds(pos);

  const movePosition = (pos, delta) =>
    Math.max(0, Math.min(vidLenSec, pos + delta));
  const skipOpening = (pos) =>
    opStartSec <= pos && pos <= opEndSec ? opEndSec : pos;

  for (const cmd of commands) {
    curPosSec = skipOpening(curPosSec);
    curPosSec =
      cmd === "prev"
        ? movePosition(curPosSec, -10)
        : cmd === "next"
        ? movePosition(curPosSec, 10)
        : curPosSec;
    curPosSec = skipOpening(curPosSec);
  }

  return toTimeString(curPosSec);
}
