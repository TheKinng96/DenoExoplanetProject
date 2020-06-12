import { join } from "http://deno.land/std/path/mod.ts";
import { BufReader } from "http://deno.land/std/io/bufio.ts";
import { parse } from "http://deno.land/std/encoding/csv.ts";

interface Planet {
  [key: string]: string;
}

async function loadPlanetData() {
  const path = join(".", "original.csv");

  const data = await Deno.open(path);
  const bufReader = new BufReader(data);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(data.rid);

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
      stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });

  return planets;
}

const newEarths = await loadPlanetData();
console.log(`${newEarths.length} habitable planets found!`);
