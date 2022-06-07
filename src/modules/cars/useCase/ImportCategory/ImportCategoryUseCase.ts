import fs from 'fs';
import { parse } from 'csv-parse';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): any {
    const stream = fs.createReadStream(file.path);

    const parseFile = parse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line: string) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase }