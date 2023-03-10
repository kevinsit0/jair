import yts from "yt-search";

/**
 *
 * @param {string} query
 * @returns
 */
async function search(query, options = {}) {
  const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
  return search.videos;
}

function ConvertMiles(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = "$1.";
  let arr = number.toString().split(".");
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join(".") : arr[0];
}

let handler = async (m, { conn, text, args }) => {
  if (!text)
    throw "*[βππππβ] πΈπ½ππ΄πππ΄ π΄π» π½πΎπΌπ±ππ΄ π³π΄ π°π»πΆππ½ ππΈπ³π΄πΎ πΎ π²π°π½π°π» π³π΄ ππΎππππ±π΄*";
  try {
    const list = await search(args.join(" "));
    let tex = `*YouTube Search*\n`;
    let n = 1;
    for (let x of list) {
      tex += `\n*${n}. ${x.title}*\n*Canal β* ${x.author.name}\n*Duracion β* ${
        x.timestamp
      }\n*Vistas β* ${ConvertMiles(x.views)}\n*Publicado β* ${
        x.ago
      }\n*Link β* ${x.url}\n`;
      n++;
    }
    conn.sendMessage(
      m.chat,
      { image: { url: list[0].image }, caption: tex },
      { quoted: m }
    );
  } catch (error) {
    m.reply(error);
    console.log(error);
  }
};
handler.help = ["", "search"].map((v) => "yts" + v + " < Busqueda >");
handler.tags = ["tools"];
handler.command = /^yts(earch)?$/i;
export default handler;
