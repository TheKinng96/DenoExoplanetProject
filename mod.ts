import { join } from "http://deno.land/std/path/mod.ts";
import { BufReader } from "http://deno.land/std/io/bufio.ts";
import { parse } from "http://deno.land/std/encoding/csv.ts";

async function loadPlanetData() {
  const path = join(".", "data.csv");

  const data = await Deno.open(path);
  const bufReader = new BufReader(data);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(data.rid);

  console.log(result);
}

await loadPlanetData();
